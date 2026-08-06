from fastapi import APIRouter
from app.schemas.metrics import MetricsResponse
from app.services.dashboard_service import dashboard_service

router = APIRouter()

@router.get("/metrics", response_model=MetricsResponse)
def metrics():
    return dashboard_service.get_metrics()