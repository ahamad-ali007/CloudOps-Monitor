from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api.dashboard import router as dashboard_router
from app.api.metrics import router as metrics_router
from app.api.resources import router as resources_router
from app.api.alerts import router as alerts_router
from app.api.timeline import router as timeline_router
from app.api.auth import router as auth_router

from app.config.settings import settings


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)


# ----------------------------------------------------------
# CORS CONFIGURATION
# ----------------------------------------------------------

origins = [
    # Local development
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",

    # Production frontend
    "https://cloudops-monitor-frontend.onrender.com",
]

# Optional FRONTEND_URL from Render environment variables
frontend_url = os.getenv("FRONTEND_URL")

if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------------------------------------
# API ROUTERS
# ----------------------------------------------------------

app.include_router(dashboard_router)

app.include_router(metrics_router)

app.include_router(resources_router)

app.include_router(alerts_router)

app.include_router(timeline_router)

app.include_router(auth_router)


# ----------------------------------------------------------
# ROOT
# ----------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Welcome to CloudOps Monitor API 🚀",
        "status": "Running"
    }