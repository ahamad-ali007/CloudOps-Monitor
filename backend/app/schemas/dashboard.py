from fastapi import APIRouter
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import get_dashboard
from app.utils.logger import logger

router = APIRouter()


@router.get("/dashboard", response_model=DashboardResponse)
def dashboard():
    logger.info("GET /dashboard requested")

    return get_dashboard()