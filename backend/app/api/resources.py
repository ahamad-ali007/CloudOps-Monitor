from fastapi import APIRouter

router = APIRouter()


@router.get("/resources")
def resources():

    return {

        "running_ec2": 12,

        "stopped_ec2": 3,

        "s3": 8,

        "lambda": 15

    }