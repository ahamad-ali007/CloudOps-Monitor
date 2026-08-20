from app.config.aws import get_ec2_client
from app.utils.logger import logger


class EC2Service:

    def __init__(self):
        self.client = get_ec2_client()

    def get_summary(self):

        logger.info("Fetching EC2 instances from AWS")

        response = self.client.describe_instances()

        running = 0
        stopped = 0
        pending = 0
        total = 0

        for reservation in response.get("Reservations", []):

            for instance in reservation.get("Instances", []):

                total += 1

                state = instance.get("State", {}).get("Name")

                if state == "running":
                    running += 1

                elif state == "stopped":
                    stopped += 1

                elif state == "pending":
                    pending += 1

        logger.info(
            "EC2 summary: total=%s running=%s stopped=%s pending=%s",
            total,
            running,
            stopped,
            pending,
        )

        return {
            "running_ec2": running,
            "stopped_ec2": stopped,
            "pending_ec2": pending,
            "total_ec2": total,
        }


ec2_service = EC2Service()