from pydantic import BaseModel


class ResourcesResponse(BaseModel):
    running_ec2: int
    stopped_ec2: int
    s3_buckets: int
    lambda_functions: int