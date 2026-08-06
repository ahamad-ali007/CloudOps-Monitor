from fastapi import APIRouter
from app.services.dashboard_service import dashboard_service

router = APIRouter()

@router.get("/dashboard")
def dashboard():
    return dashboard_service.get_dashboard()