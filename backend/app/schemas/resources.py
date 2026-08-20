from pydantic import BaseModel


class ResourcesResponse(BaseModel):
    running_ec2: int
    stopped_ec2: int
    pending_ec2: int
    total_ec2: int
    s3: int
    lambda_functions: int