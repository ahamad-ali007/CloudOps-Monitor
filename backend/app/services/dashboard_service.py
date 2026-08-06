from datetime import datetime


class DashboardService:

    def get_dashboard(self):
        return {
            "health": 95,
            "region": "ap-south-1",
            "last_updated": datetime.now().strftime("%H:%M:%S"),
            "running_services": 24,
        }

    def get_metrics(self):
        return {
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

    def get_resources(self):
        return {
            "running_ec2": 12,
            "stopped_ec2": 3,
            "s3_buckets": 8,
            "lambda_functions": 15,
        }

    def get_alerts(self):
        return {
            "count": 3,
            "last_updated": datetime.now().strftime("%H:%M:%S"),
            "alerts": [
                {
                    "id": 1,
                    "level": "Critical",
                    "message": "CPU exceeded 90%",
                },
                {
                    "id": 2,
                    "level": "Warning",
                    "message": "Storage utilization reached 78%",
                },
                {
                    "id": 3,
                    "level": "Info",
                    "message": "EC2 instance restarted",
                },
            ],
        }

    def get_timeline(self):
        return {
            "count": 4,
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
            ],
        }


dashboard_service = DashboardService()