from app.utils.logger import logger


def get_dashboard():
    logger.info("Loading dashboard information")

    dashboard = {
        "health": 95,
        "region": "ap-south-1",
        "last_updated": "2 seconds ago",
        "running_services": 24,
    }

    logger.info("Dashboard information loaded successfully")

    return dashboard


def get_metrics():
    logger.info("Loading dashboard metrics")

    metrics = {
        "cards": {
            "cpu": 45,
            "memory": 68,
            "storage": 74,
            "network": "Healthy",
        },
        "cpu_chart": [
            {"time": "10:00", "value": 20},
            {"time": "10:10", "value": 35},
            {"time": "10:20", "value": 45},
            {"time": "10:30", "value": 38},
            {"time": "10:40", "value": 52},
            {"time": "10:50", "value": 40},
        ],
        "memory_chart": [
            {"time": "10:00", "value": 48},
            {"time": "10:10", "value": 50},
            {"time": "10:20", "value": 55},
            {"time": "10:30", "value": 60},
            {"time": "10:40", "value": 63},
            {"time": "10:50", "value": 68},
        ],
    }

    logger.info("Metrics loaded successfully")

    return metrics


def get_resources():
    logger.info("Loading AWS resource summary")

    resources = {
        "running_ec2": 12,
        "stopped_ec2": 3,
        "s3": 8,
        "lambda_functions": 15,
    }

    logger.info("AWS resource summary loaded successfully")

    return resources


def get_alerts():
    logger.info("Loading recent alerts")

    alerts = {
        "alerts": [
            {
                "level": "Critical",
                "message": "CPU exceeded 90%",
            },
            {
                "level": "Warning",
                "message": "Storage utilization reached 78%",
            },
            {
                "level": "Info",
                "message": "EC2 instance restarted",
            },
        ]
    }

    logger.info("Recent alerts loaded successfully")

    return alerts


def get_timeline():
    logger.info("Loading activity timeline")

    timeline = {
        "timeline": [
            {
                "time": "11:10",
                "event": "EC2 Started",
            },
            {
                "time": "11:18",
                "event": "CloudWatch Alarm Triggered",
            },
            {
                "time": "11:25",
                "event": "User Login",
            },
            {
                "time": "11:35",
                "event": "Lambda Executed",
            },
        ]
    }

    logger.info("Activity timeline loaded successfully")

    return timeline