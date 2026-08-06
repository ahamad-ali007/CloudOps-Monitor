export const resources = [
  {
    name: "Running EC2",
    value: 12,
    color: "text-green-400",
  },
  {
    name: "Stopped EC2",
    value: 3,
    color: "text-red-400",
  },
  {
    name: "S3 Buckets",
    value: 8,
    color: "text-cyan-400",
  },
  {
    name: "Lambda",
    value: 15,
    color: "text-purple-400",
  },
];

export const alerts = [
  {
    severity: "Critical",
    message: "CPU exceeded 90%",
  },
  {
    severity: "Warning",
    message: "Storage utilization reached 78%",
  },
  {
    severity: "Info",
    message: "EC2 instance restarted",
  },
];

export const timeline = [
  "11:10 EC2 Instance Started",
  "11:18 CloudWatch Alarm Triggered",
  "11:26 User Login",
  "11:35 Lambda Executed",
];