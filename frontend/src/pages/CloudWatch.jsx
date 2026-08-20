import { useEffect, useState } from "react";
import { Activity, Cpu, HardDrive, MemoryStick, RefreshCw } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricChart from "../components/MetricChart";
import { getMetrics } from "../services/dashboardService";

function CloudWatch() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load CloudWatch metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const timeout = setTimeout(() => {
    loadMetrics();
  }, 0);

  const interval = setInterval(() => {
    loadMetrics();
  }, 30000);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);

  const cards = metrics?.cards;

  const network = metrics?.network_metrics;

  const networkTotalKB = network
    ? (
        (Number(network.bytes_sent || 0) +
          Number(network.bytes_recv || 0)) /
        1024
      ).toFixed(2)
    : "--";

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
                CloudWatch
              </h2>

              <p className="mt-2 text-gray-400">
                Real-time AWS infrastructure metrics
              </p>
            </div>

            <button
              onClick={loadMetrics}
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

          {/* Loading */}
          {loading && !metrics && (
            <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
              <p className="text-gray-400">
                Loading CloudWatch metrics...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
              <p className="font-semibold">
                {error}
              </p>
            </div>
          )}

          {/* Metric cards */}
          {metrics && (
            <>
              <div className="mt-10 grid grid-cols-4 gap-6">

                <MetricCard
                  title="CPU Usage"
                  value={
                    cards?.cpu != null
                      ? `${Number(cards.cpu).toFixed(2)}%`
                      : "--"
                  }
                  icon={Cpu}
                  className="text-green-400"
                />

                <MetricCard
                  title="Memory Usage"
                  value={
                    cards?.memory != null
                      ? `${Number(cards.memory).toFixed(2)}%`
                      : "--"
                  }
                  icon={MemoryStick}
                  className="text-yellow-400"
                />

                <MetricCard
                  title="Storage Usage"
                  value={
                    cards?.storage != null
                      ? `${Number(cards.storage).toFixed(2)}%`
                      : "--"
                  }
                  icon={HardDrive}
                  className="text-cyan-400"
                />

                <MetricCard
                  title="Network"
                  value={`${networkTotalKB} KB`}
                  icon={Activity}
                  className="text-blue-400"
                />

              </div>

              {/* Charts */}
              <div className="mt-10 grid grid-cols-2 gap-6">

                <MetricChart
                  title="CPU Usage"
                  data={metrics?.cpu_chart ?? []}
                  color="#22c55e"
                />

                <MetricChart
                  title="Memory Usage"
                  data={metrics?.memory_chart ?? []}
                  color="#06b6d4"
                />

              </div>

              {/* Network details */}
              {network && (
                <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800 p-6">

                  <div className="flex items-center gap-3">
                    <Activity
                      size={22}
                      className="text-blue-400"
                    />

                    <h3 className="text-xl font-semibold">
                      Network Activity
                    </h3>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-6">

                    <div>
                      <p className="text-sm text-gray-400">
                        Bytes Sent
                      </p>

                      <p className="mt-2 text-2xl font-bold">
                        {Number(
                          network.bytes_sent || 0
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">
                        Bytes Received
                      </p>

                      <p className="mt-2 text-2xl font-bold">
                        {Number(
                          network.bytes_recv || 0
                        ).toLocaleString()}
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </>
          )}

        </main>
      </div>
    </div>
  );
}

/*
 * Small reusable metric card for this page.
 */
function MetricCard({
  title,
  value,
  icon: Icon,
  className = "",
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-400">
          {title}
        </p>

        {Icon && (
          <Icon
            size={22}
            className={className}
          />
        )}

      </div>

      <p
        className={`mt-4 text-3xl font-bold ${className}`}
      >
        {value}
      </p>

    </div>
  );
}

export default CloudWatch;