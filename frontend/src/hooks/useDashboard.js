import { useEffect, useState } from "react";

import {
  getDashboard,
  getMetrics,
  getResources,
  getAlerts,
  getTimeline,
} from "../services/dashboardService";

const REFRESH_INTERVAL =
  Number(import.meta.env.VITE_REFRESH_INTERVAL || 30) * 1000;

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [resources, setResources] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    try {
      setError(null);

      const [
        dashboardData,
        metricsData,
        resourcesData,
        alertsData,
        timelineData,
      ] = await Promise.all([
        getDashboard(),
        getMetrics(),
        getResources(),
        getAlerts(),
        getTimeline(),
      ]);

      setDashboard(dashboardData);
      setMetrics(metricsData);
      setResources(resourcesData);
      setAlerts(alertsData);
      setTimeline(timelineData);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const timeout = setTimeout(() => {
    loadData();
  }, 0);

  const interval = setInterval(() => {
    loadData();
  }, REFRESH_INTERVAL);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);

  return {
    dashboard,
    metrics,
    resources,
    alerts,
    timeline,
    loading,
    error,
    refresh: loadData,
  };
}