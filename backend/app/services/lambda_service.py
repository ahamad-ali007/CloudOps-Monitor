from app.config.aws import get_lambda_client
from app.utils.logger import logger


class LambdaService:

    def __init__(self):
        self.client = get_lambda_client()

    def get_function_count(self):

        logger.info("Fetching Lambda functions from AWS")

        response = self.client.list_functions()

        functions = response.get("Functions", [])

        logger.info(
            "Found %s Lambda functions",
            len(functions)
        )

        return len(functions)


lambda_service = LambdaService()