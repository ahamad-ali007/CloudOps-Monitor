from app.config.aws import get_s3_client
from app.utils.logger import logger


class S3Service:

    def __init__(self):
        self.client = get_s3_client()

    def get_bucket_count(self):

        logger.info("Fetching S3 buckets from AWS")

        response = self.client.list_buckets()

        buckets = response.get("Buckets", [])

        logger.info(
            "Found %s S3 buckets",
            len(buckets)
        )

        return len(buckets)


s3_service = S3Service()