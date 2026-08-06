from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router
from app.api.metrics import router as metrics_router
from app.api.resources import router as resources_router
from app.api.alerts import router as alerts_router
from app.api.timeline import router as timeline_router

app = FastAPI(
    title="CloudOps Monitor API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)

app.include_router(metrics_router)

app.include_router(resources_router)

app.include_router(alerts_router)

app.include_router(timeline_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to CloudOps Monitor API 🚀",
        "status": "Running"
    }