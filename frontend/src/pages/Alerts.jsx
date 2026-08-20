import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Info,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAlerts } from "../services/dashboardService";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAlerts();

      // Backend currently returns either:
      // [{ level, message }]
      // or { alerts: [...] }
      const alertList = Array.isArray(data)
        ? data
        : data?.alerts ?? [];

      setAlerts(alertList);
    } catch (err) {
      console.error(err);
      setError("Unable to load alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const timeout = setTimeout(() => {
    loadAlerts();
  }, 0);

  const interval = setInterval(() => {
    loadAlerts();
  }, 30000);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);

  const getAlertStyle = (level) => {
    switch (String(level).toLowerCase()) {
      case "critical":
        return {
          icon: AlertCircle,
          iconClass: "text-red-400",
          borderClass: "border-red-500/30",
          bgClass: "bg-red-500/10",
          textClass: "text-red-400",
        };

      case "warning":
        return {
          icon: TriangleAlert,
          iconClass: "text-yellow-400",
          borderClass: "border-yellow-500/30",
          bgClass: "bg-yellow-500/10",
          textClass: "text-yellow-400",
        };

      case "info":
        return {
          icon: Info,
          iconClass: "text-blue-400",
          borderClass: "border-blue-500/30",
          bgClass: "bg-blue-500/10",
          textClass: "text-blue-400",
        };

      default:
        return {
          icon: CheckCircle,
          iconClass: "text-green-400",
          borderClass: "border-green-500/30",
          bgClass: "bg-green-500/10",
          textClass: "text-green-400",
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar connected={!error} />

        <main className="p-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Alerts
              </h2>

              <p className="mt-2 text-gray-400">
                Recent AWS infrastructure alerts
              </p>
            </div>

            <button
              onClick={loadAlerts}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-slate-700 hover:text-cyan-400 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />

              Refresh
            </button>
          </div>

          {/* Summary */}
          <div className="mt-10 grid grid-cols-3 gap-6">

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <p className="text-sm text-gray-400">
                Total Alerts
              </p>

              <p className="mt-3 text-3xl font-bold text-white">
                {alerts.length}
              </p>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-slate-800 p-6">
              <p className="text-sm text-gray-400">
                Critical
              </p>

              <p className="mt-3 text-3xl font-bold text-red-400">
                {
                  alerts.filter(
                    (alert) =>
                      String(alert.level).toLowerCase() ===
                      "critical"
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-slate-800 p-6">
              <p className="text-sm text-gray-400">
                Warnings
              </p>

              <p className="mt-3 text-3xl font-bold text-yellow-400">
                {
                  alerts.filter(
                    (alert) =>
                      String(alert.level).toLowerCase() ===
                      "warning"
                  ).length
                }
              </p>
            </div>

          </div>

          {/* Loading */}
          {loading && alerts.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
              <p className="text-gray-400">
                Loading alerts...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6">
              <p className="font-semibold text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && alerts.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-10 text-center">
              <CheckCircle
                size={40}
                className="mx-auto text-green-400"
              />

              <h3 className="mt-4 text-xl font-semibold">
                No active alerts
              </h3>

              <p className="mt-2 text-gray-400">
                CloudOps Monitor has not detected any recent alerts.
              </p>
            </div>
          )}

          {/* Alert list */}
          {alerts.length > 0 && (
            <div className="mt-8 space-y-4">

              {alerts.map((alert, index) => {
                const style = getAlertStyle(alert.level);
                const Icon = style.icon;

                return (
                  <div
                    key={`${alert.level}-${alert.message}-${index}`}
                    className={`flex items-center gap-4 rounded-xl border ${style.borderClass} ${style.bgClass} p-5`}
                  >
                    <Icon
                      size={26}
                      className={style.iconClass}
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-bold ${style.textClass}`}
                        >
                          {alert.level}
                        </span>
                      </div>

                      <p className="mt-1 text-gray-200">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Alerts;