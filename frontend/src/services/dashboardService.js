import api from "./api";

export const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

export const getMetrics = async () => {
  const response = await api.get("/metrics");
  return response.data;
};

export const getResources = async () => {
  const response = await api.get("/resources");
  return response.data;
};

export const getAlerts = async () => {
  const response = await api.get("/alerts");
  return response.data;
};

export const getTimeline = async () => {
  const response = await api.get("/timeline");
  return response.data;
};