from fastapi import FastAPI

# Create the FastAPI application
app = FastAPI(
    title="CloudOps Monitor API",
    description="Backend API for CloudOps Monitor",
    version="1.0.0"
)

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Welcome to CloudOps Monitor API 🚀",
        "status": "Running"
    }