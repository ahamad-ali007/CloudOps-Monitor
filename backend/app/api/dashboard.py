from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    return {
        "health": 95,
        "region": "ap-south-1",
        "last_updated": "2 seconds ago",
        "running_services": 24
    }