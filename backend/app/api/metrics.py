from fastapi import APIRouter

router = APIRouter()

@router.get("/metrics")
def metrics():
    return {
        "cards": {
            "cpu": 45,
            "memory": 68,
            "storage": 74,
            "network": "Healthy"
        },
        "cpu_chart": [
            {"time": "10:00", "value": 20},
            {"time": "10:10", "value": 35},
            {"time": "10:20", "value": 45},
            {"time": "10:30", "value": 38},
            {"time": "10:40", "value": 52},
            {"time": "10:50", "value": 40}
        ],
        "memory_chart": [
            {"time": "10:00", "value": 48},
            {"time": "10:10", "value": 50},
            {"time": "10:20", "value": 55},
            {"time": "10:30", "value": 60},
            {"time": "10:40", "value": 63},
            {"time": "10:50", "value": 68}
        ]
    }