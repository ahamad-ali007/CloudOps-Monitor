from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.services.ec2_service import ec2_service
from app.services.s3_service import s3_service
from app.services.lambda_service import lambda_service
from app.schemas.resources import ResourcesResponse


router = APIRouter()


@router.get("/resources", response_model=ResourcesResponse)
def resources(
    current_user=Depends(get_current_user),
):

    ec2_data = ec2_service.get_summary()

    s3_count = s3_service.get_bucket_count()

    lambda_count = lambda_service.get_function_count()

    return {
        "running_ec2": ec2_data["running_ec2"],
        "stopped_ec2": ec2_data["stopped_ec2"],
        "pending_ec2": ec2_data["pending_ec2"],
        "total_ec2": ec2_data["total_ec2"],
        "s3": s3_count,
        "lambda_functions": lambda_count,
    }