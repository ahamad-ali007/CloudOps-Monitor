from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.config.settings import settings
from app.services.cloudwatch_service import cloudwatch_service
from app.services.alert_service import save_alert
from app.database.database import get_db
from app.utils.logger import logger


router = APIRouter()


@router.get("/alerts")
def alerts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    logger.info("GET /alerts")

    # ----------------------------------------------------------
    # Fetch current real AWS metrics
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

    alerts_list = []

    # ----------------------------------------------------------
    # CPU alerts
    # ----------------------------------------------------------

    if cpu >= 90:

        alerts_list.append({
            "level": "Critical",
            "message": f"CPU usage reached {cpu:.2f}%"
        })

    elif cpu >= 80:

        alerts_list.append({
            "level": "Warning",
            "message": f"CPU usage reached {cpu:.2f}%"
        })

    # ----------------------------------------------------------
    # Memory alerts
    # ----------------------------------------------------------

    if memory >= 90:

        alerts_list.append({
            "level": "Critical",
            "message": f"Memory usage reached {memory:.2f}%"
        })

    elif memory >= 80:

        alerts_list.append({
            "level": "Warning",
            "message": f"Memory usage reached {memory:.2f}%"
        })

    # ----------------------------------------------------------
    # Storage alerts
    # ----------------------------------------------------------

    if storage >= 90:

        alerts_list.append({
            "level": "Critical",
            "message": f"Storage usage reached {storage:.2f}%"
        })

    elif storage >= 80:

        alerts_list.append({
            "level": "Warning",
            "message": f"Storage usage reached {storage:.2f}%"
        })

    # ----------------------------------------------------------
    # Network information
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

        alerts_list.append({
            "level": "Info",
            "message": (
                f"Network active: "
                f"{bytes_sent:.0f} bytes sent, "
                f"{bytes_recv:.0f} bytes received"
            )
        })

    # ----------------------------------------------------------
    # No critical/warning conditions
    # ----------------------------------------------------------

    if not alerts_list:

        alerts_list.append({
            "level": "Info",
            "message": (
                "All monitored resources are "
                "operating normally"
            )
        })

    # ----------------------------------------------------------
    # Persist generated alerts
    # ----------------------------------------------------------

    for alert in alerts_list:

        save_alert(
            db=db,
            severity=alert["level"],
            title=f"{alert['level']} Alert",
            message=alert["message"],
        )

    logger.info(
        "Generated and persisted %d alerts",
        len(alerts_list)
    )

    return alerts_list