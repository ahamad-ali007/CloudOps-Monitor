from datetime import datetime, timedelta, timezone

import boto3

from app.config.aws import get_cloudwatch_client
from app.config.settings import settings
from app.utils.logger import logger


class CloudWatchService:

    def __init__(self):
        # CloudWatch client → metrics
        self.client = get_cloudwatch_client()

        # EC2 client → instance information
        self.ec2_client = boto3.client("ec2")

        # Cache discovered dimensions
        self._hostname = None
        self._storage_dimensions = None
        self._network_interface = None

    # ==========================================================
    # HELPER — GET LATEST AVERAGE
    # ==========================================================

    @staticmethod
    def _get_latest_average(datapoints):

        if not datapoints:
            return None

        latest = max(
            datapoints,
            key=lambda point: point["Timestamp"]
        )

        return round(latest["Average"], 2)

    # ==========================================================
    # HELPER — GET EC2 HOSTNAME DYNAMICALLY
    # ==========================================================

    def get_instance_hostname(self):

        if self._hostname:
            return self._hostname

        logger.info(
            "Discovering EC2 hostname for instance %s",
            settings.EC2_INSTANCE_ID
        )

        response = self.ec2_client.describe_instances(
            InstanceIds=[settings.EC2_INSTANCE_ID]
        )

        reservations = response.get(
            "Reservations",
            []
        )

        if not reservations:
            raise RuntimeError(
                "EC2 instance not found"
            )

        instances = reservations[0].get(
            "Instances",
            []
        )

        if not instances:
            raise RuntimeError(
                "EC2 instance not found"
            )

        hostname = instances[0].get(
            "PrivateDnsName"
        )

        if not hostname:
            raise RuntimeError(
                "EC2 private hostname not found"
            )

        self._hostname = hostname

        logger.info(
            "Discovered EC2 hostname: %s",
            hostname
        )

        return hostname

    # ==========================================================
    # HELPER — DISCOVER STORAGE DIMENSIONS
    # ==========================================================

    def get_storage_dimensions(self):

        if self._storage_dimensions:
            return self._storage_dimensions

        hostname = self.get_instance_hostname()

        logger.info(
            "Discovering storage dimensions for %s",
            hostname
        )

        response = self.client.list_metrics(
            Namespace="CloudOpsMonitor",
            MetricName="disk_used_percent",
            Dimensions=[
                {
                    "Name": "host",
                    "Value": hostname,
                }
            ],
        )

        metrics = response.get(
            "Metrics",
            []
        )

        if not metrics:
            logger.warning(
                "No disk metrics found for %s",
                hostname
            )

            return None

        for metric in metrics:

            dimensions = {
                dimension["Name"]: dimension["Value"]
                for dimension in metric.get(
                    "Dimensions",
                    []
                )
            }

            if (
                "path" in dimensions
                and "device" in dimensions
            ):

                self._storage_dimensions = {
                    "path": dimensions["path"],
                    "host": dimensions["host"],
                    "device": dimensions["device"],
                }

                if "fstype" in dimensions:

                    self._storage_dimensions[
                        "fstype"
                    ] = dimensions["fstype"]

                logger.info(
                    "Discovered storage dimensions: %s",
                    self._storage_dimensions
                )

                return self._storage_dimensions

        logger.warning(
            "Could not find valid storage dimensions"
        )

        return None

    # ==========================================================
    # HELPER — DISCOVER NETWORK INTERFACE
    # ==========================================================

    def get_network_interface(self):

        if self._network_interface:
            return self._network_interface

        hostname = self.get_instance_hostname()

        logger.info(
            "Discovering network interface for %s",
            hostname
        )

        response = self.client.list_metrics(
            Namespace="CloudOpsMonitor",
            MetricName="net_bytes_sent",
            Dimensions=[
                {
                    "Name": "host",
                    "Value": hostname,
                }
            ],
        )

        metrics = response.get(
            "Metrics",
            []
        )

        if not metrics:
            logger.warning(
                "No network metrics found for %s",
                hostname
            )

            return None

        for metric in metrics:

            dimensions = {
                dimension["Name"]: dimension["Value"]
                for dimension in metric.get(
                    "Dimensions",
                    []
                )
            }

            if "interface" in dimensions:

                self._network_interface = (
                    dimensions["interface"]
                )

                logger.info(
                    "Discovered network interface: %s",
                    self._network_interface
                )

                return self._network_interface

        logger.warning(
            "Could not discover network interface"
        )

        return None

    # ==========================================================
    # CPU METRICS
    # ==========================================================

    def get_cpu_metrics(self, instance_id: str):

        logger.info(
            "Fetching CPU metrics for EC2 instance %s",
            instance_id
        )

        end_time = datetime.now(
            timezone.utc
        )

        start_time = (
            end_time -
            timedelta(minutes=60)
        )

        response = self.client.get_metric_statistics(
            Namespace="AWS/EC2",
            MetricName="CPUUtilization",
            Dimensions=[
                {
                    "Name": "InstanceId",
                    "Value": instance_id,
                }
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=300,
            Statistics=["Average"],
        )

        datapoints = response.get(
            "Datapoints",
            []
        )

        datapoints.sort(
            key=lambda point: point["Timestamp"]
        )

        metrics = []

        for point in datapoints:

            metrics.append(
                {
                    "time": point[
                        "Timestamp"
                    ].strftime("%H:%M"),
                    "value": round(
                        point["Average"],
                        2
                    ),
                }
            )

        logger.info(
            "Retrieved %s CPU datapoints for %s",
            len(metrics),
            instance_id
        )

        return metrics

    # ==========================================================
    # MEMORY USAGE
    # ==========================================================

    def get_memory_usage(self):

        logger.info(
            "Fetching memory usage from CloudWatch"
        )

        hostname = self.get_instance_hostname()

        end_time = datetime.now(
            timezone.utc
        )

        start_time = (
            end_time -
            timedelta(minutes=10)
        )

        response = self.client.get_metric_statistics(
            Namespace="CloudOpsMonitor",
            MetricName="mem_used_percent",
            Dimensions=[
                {
                    "Name": "host",
                    "Value": hostname,
                }
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=60,
            Statistics=["Average"],
        )

        datapoints = response.get(
            "Datapoints",
            []
        )

        memory = self._get_latest_average(
            datapoints
        )

        if memory is None:

            logger.warning(
                "No memory datapoints found"
            )

            return 0.0

        logger.info(
            "Current memory usage: %s%%",
            memory
        )

        return memory

    # ==========================================================
    # MEMORY CHART METRICS
    # ==========================================================

    def get_memory_metrics(self):

        logger.info(
            "Fetching memory chart metrics from CloudWatch"
        )

        hostname = self.get_instance_hostname()

        end_time = datetime.now(
            timezone.utc
        )

        start_time = (
            end_time -
            timedelta(minutes=60)
        )

        response = self.client.get_metric_statistics(
            Namespace="CloudOpsMonitor",
            MetricName="mem_used_percent",
            Dimensions=[
                {
                    "Name": "host",
                    "Value": hostname,
                }
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=300,
            Statistics=["Average"],
        )

        datapoints = response.get(
            "Datapoints",
            []
        )

        datapoints.sort(
            key=lambda point: point["Timestamp"]
        )

        metrics = []

        for point in datapoints:

            metrics.append(
                {
                    "time": point[
                        "Timestamp"
                    ].strftime("%H:%M"),
                    "value": round(
                        point["Average"],
                        2
                    ),
                }
            )

        logger.info(
            "Retrieved %s memory datapoints",
            len(metrics)
        )

        return metrics

    # ==========================================================
    # STORAGE USAGE
    # ==========================================================

    def get_storage_usage(self):

        logger.info(
            "Fetching storage usage from CloudWatch"
        )

        dimensions = self.get_storage_dimensions()

        if not dimensions:

            logger.warning(
                "Storage dimensions unavailable"
            )

            return 0.0

        end_time = datetime.now(
            timezone.utc
        )

        start_time = (
            end_time -
            timedelta(minutes=10)
        )

        cloudwatch_dimensions = [
            {
                "Name": "path",
                "Value": dimensions["path"],
            },
            {
                "Name": "host",
                "Value": dimensions["host"],
            },
            {
                "Name": "device",
                "Value": dimensions["device"],
            },
        ]

        if "fstype" in dimensions:

            cloudwatch_dimensions.append(
                {
                    "Name": "fstype",
                    "Value": dimensions["fstype"],
                }
            )

        response = self.client.get_metric_statistics(
            Namespace="CloudOpsMonitor",
            MetricName="disk_used_percent",
            Dimensions=cloudwatch_dimensions,
            StartTime=start_time,
            EndTime=end_time,
            Period=60,
            Statistics=["Average"],
        )

        datapoints = response.get(
            "Datapoints",
            []
        )

        storage = self._get_latest_average(
            datapoints
        )

        if storage is None:

            logger.warning(
                "No storage datapoints found"
            )

            return 0.0

        logger.info(
            "Current storage usage: %s%%",
            storage
        )

        return storage

    # ==========================================================
    # NETWORK USAGE
    # ==========================================================

    def get_network_usage(self):

        logger.info(
            "Fetching network metrics from CloudWatch"
        )

        hostname = self.get_instance_hostname()

        interface = self.get_network_interface()

        metrics = {
            "bytes_sent": 0.0,
            "bytes_recv": 0.0,
        }

        if not interface:

            logger.warning(
                "Network interface unavailable"
            )

            return metrics

        end_time = datetime.now(
            timezone.utc
        )

        start_time = (
            end_time -
            timedelta(minutes=10)
        )

        network_metrics = {
            "bytes_sent": "net_bytes_sent",
            "bytes_recv": "net_bytes_recv",
        }

        for output_name, metric_name in (
            network_metrics.items()
        ):

            response = self.client.get_metric_statistics(
                Namespace="CloudOpsMonitor",
                MetricName=metric_name,
                Dimensions=[
                    {
                        "Name": "host",
                        "Value": hostname,
                    },
                    {
                        "Name": "interface",
                        "Value": interface,
                    },
                ],
                StartTime=start_time,
                EndTime=end_time,
                Period=60,
                Statistics=["Average"],
            )

            datapoints = response.get(
                "Datapoints",
                []
            )

            value = self._get_latest_average(
                datapoints
            )

            if value is not None:

                metrics[output_name] = value

            else:

                logger.warning(
                    "No %s datapoints found",
                    metric_name
                )

        logger.info(
            "Network metrics: %s",
            metrics
        )

        return metrics


cloudwatch_service = CloudWatchService()