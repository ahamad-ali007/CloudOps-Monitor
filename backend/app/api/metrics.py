from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.config.settings import settings
from app.schemas.metrics import MetricsResponse
from app.services.cloudwatch_service import cloudwatch_service
from app.utils.logger import logger


router = APIRouter()


@router.get("/metrics", response_model=MetricsResponse)
def metrics(
    current_user=Depends(get_current_user),
):

    logger.info("GET /metrics")

    # ----------------------------------------------------------
    # CPU
    # ----------------------------------------------------------

    cpu_chart = cloudwatch_service.get_cpu_metrics(
        settings.EC2_INSTANCE_ID
    )

    cpu = (
        cpu_chart[-1]["value"]
        if cpu_chart
        else 0
    )

    # ----------------------------------------------------------
    # MEMORY
    # ----------------------------------------------------------

    memory = cloudwatch_service.get_memory_usage()

    memory_chart = cloudwatch_service.get_memory_metrics()

    # ----------------------------------------------------------
    # STORAGE
    # ----------------------------------------------------------

    storage = cloudwatch_service.get_storage_usage()

    # ----------------------------------------------------------
    # NETWORK
    # ----------------------------------------------------------

    network_metrics = cloudwatch_service.get_network_usage()

    # ----------------------------------------------------------
    # RESPONSE
    # ----------------------------------------------------------

    return {
        "cards": {
            "cpu": cpu,
            "memory": memory,
            "storage": storage,
            "network": "Healthy",
        },

        "cpu_chart": cpu_chart,

        "memory_chart": memory_chart,

        "network_metrics": network_metrics,
    }