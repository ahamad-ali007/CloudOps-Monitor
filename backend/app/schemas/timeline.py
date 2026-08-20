from fastapi import APIRouter
from app.schemas.timeline import TimelineResponse
from app.services.dashboard_service import get_timeline
from app.utils.logger import logger

router = APIRouter()


@router.get("/timeline", response_model=TimelineResponse)
def timeline():
    logger.info("GET /timeline requested")

    return get_timeline()