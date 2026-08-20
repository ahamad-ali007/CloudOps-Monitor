from fastapi import APIRouter
from app.schemas.alerts import AlertsResponse
from app.services.dashboard_service import get_alerts
from app.utils.logger import logger

router = APIRouter()


@router.get("/alerts", response_model=AlertsResponse)
def alerts():
    logger.info("GET /alerts requested")

    return get_alerts()