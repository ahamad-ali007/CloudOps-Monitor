from datetime import datetime, timezone

from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.config.settings import settings
from app.services.ec2_service import ec2_service
from app.services.cloudwatch_service import cloudwatch_service
from app.utils.logger import logger


router = APIRouter()


@router.get("/dashboard")
def dashboard(
    current_user=Depends(get_current_user),
):

    logger.info("GET /dashboard requested")

    # ----------------------------------------------------------
    # AWS REGION
    # ----------------------------------------------------------

    region = settings.AWS_REGION

    # ----------------------------------------------------------
    # EC2 SUMMARY
    # ----------------------------------------------------------

    ec2_summary = ec2_service.get_summary()

    running_ec2 = ec2_summary.get(
        "running_ec2",
        0
    )

    # ----------------------------------------------------------
    # CURRENT HEALTH
    # ----------------------------------------------------------

    health = 100

    try:

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

        # Critical condition
        if (
            cpu >= 90
            or memory >= 90
            or storage >= 90
        ):

            health = 40

        # Warning condition
        elif (
            cpu >= 80
            or memory >= 80
            or storage >= 80
        ):

            health = 70

        # Normal condition
        else:

            health = 100

    except Exception as exc:

        logger.error(
            "Unable to calculate dashboard health: %s",
            exc
        )

        health = 0

    # ----------------------------------------------------------
    # LAST UPDATED
    # ----------------------------------------------------------

    last_updated = datetime.now(
        timezone.utc
    ).astimezone().strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    # ----------------------------------------------------------
    # DASHBOARD RESPONSE
    # ----------------------------------------------------------

    return {
        "health": health,
        "region": region,
        "last_updated": last_updated,
        "running_services": running_ec2,
    }