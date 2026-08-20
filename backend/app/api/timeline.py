from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.config.settings import settings
from app.database.database import get_db
from app.services.cloudwatch_service import cloudwatch_service
from app.services.activity_service import save_activity
from app.utils.logger import logger


router = APIRouter()


@router.get("/timeline")
def timeline(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    logger.info("GET /timeline")

    # ----------------------------------------------------------
    # Current timestamp
    # ----------------------------------------------------------

    current_time = datetime.now(
        timezone.utc
    ).astimezone().strftime("%H:%M")

    timeline_events = []

    # ----------------------------------------------------------
    # Fetch real metrics
    # ----------------------------------------------------------

    cpu_chart = cloudwatch_service.get_cpu_metrics(
        settings.EC2_INSTANCE_ID
    )

    cpu = (
        cpu_chart[-1]["value"]
        if cpu_chart
        else 0
    )

    memory = cloudwatch_service.get_memory_usage()

    storage = cloudwatch_service.get_storage_usage()

    network = cloudwatch_service.get_network_usage()

    # ----------------------------------------------------------
    # Monitoring cycle
    # ----------------------------------------------------------

    event = "CloudOps monitoring cycle executed"

    timeline_events.append({
        "time": current_time,
        "event": event
    })

    save_activity(
        db,
        "monitoring_cycle",
        event,
    )

    # ----------------------------------------------------------
    # CPU evaluation
    # ----------------------------------------------------------

    if cpu >= 90:

        event = f"Critical CPU usage detected: {cpu:.2f}%"

    elif cpu >= 80:

        event = f"High CPU usage detected: {cpu:.2f}%"

    else:

        event = f"CPU usage checked: {cpu:.2f}%"

    timeline_events.append({
        "time": current_time,
        "event": event
    })

    save_activity(
        db,
        "cpu_check",
        event,
    )

    # ----------------------------------------------------------
    # Memory evaluation
    # ----------------------------------------------------------

    if memory >= 90:

        event = f"Critical memory usage detected: {memory:.2f}%"

    elif memory >= 80:

        event = f"High memory usage detected: {memory:.2f}%"

    else:

        event = f"Memory usage checked: {memory:.2f}%"

    timeline_events.append({
        "time": current_time,
        "event": event
    })

    save_activity(
        db,
        "memory_check",
        event,
    )

    # ----------------------------------------------------------
    # Storage evaluation
    # ----------------------------------------------------------

    if storage >= 90:

        event = f"Critical storage usage detected: {storage:.2f}%"

    elif storage >= 80:

        event = f"High storage usage detected: {storage:.2f}%"

    else:

        event = f"Storage usage checked: {storage:.2f}%"

    timeline_events.append({
        "time": current_time,
        "event": event
    })

    save_activity(
        db,
        "storage_check",
        event,
    )

    # ----------------------------------------------------------
    # Network activity
    # ----------------------------------------------------------

    if network:

        bytes_sent = network.get(
            "bytes_sent",
            0
        )

        bytes_recv = network.get(
            "bytes_recv",
            0
        )

        event = (
            f"Network metrics updated: "
            f"{bytes_sent:.0f} bytes sent / "
            f"{bytes_recv:.0f} bytes received"
        )

        timeline_events.append({
            "time": current_time,
            "event": event
        })

        save_activity(
            db,
            "network_update",
            event,
        )

    return timeline_events