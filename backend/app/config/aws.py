import boto3

from app.config.settings import settings


def get_session():
    """
    Create a reusable boto3 session.
    """
    return boto3.Session(
        region_name=settings.AWS_REGION
    )


def get_ec2_client():
    return get_session().client("ec2")


def get_cloudwatch_client():
    return get_session().client("cloudwatch")


def get_s3_client():
    return get_session().client("s3")


def get_lambda_client():
    return get_session().client("lambda")