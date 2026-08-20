import useDashboard from "../hooks/useDashboard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import MetricChart from "../components/MetricChart";
import ResourceSummary from "../components/ResourceSummary";
import RecentAlerts from "../components/RecentAlerts";
import ActivityTimeline from "../components/ActivityTimeline";

function Dashboard({ onLogout }) {
  const {
    dashboard,
    metrics,
    resources,
    alerts,
    timeline,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <h1 className="text-3xl font-bold animate-pulse">
          Loading CloudOps Monitor...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400">
        <h1 className="text-2xl font-bold">
          {error}
        </h1>
      </div>
    );
  }

  // ----------------------------------------------------------
  // NETWORK DISPLAY
  // ----------------------------------------------------------

  const networkMetrics = metrics?.network_metrics;

  const networkTotalKB = networkMetrics
    ? (
        (Number(networkMetrics.bytes_sent || 0) +
          Number(networkMetrics.bytes_recv || 0)) /
        1024
      ).toFixed(2)
    : null;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">

        {/* Navbar */}
        <Navbar
  connected={!error}
  onLogout={onLogout}
/>

        <main className="p-8">

          {/* Dashboard Header */}
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="mt-2 text-gray-400">
            Region: {dashboard?.region ?? "--"} •{" "}
            Health: {dashboard?.health ?? "--"}% •{" "}
            Services: {dashboard?.running_services ?? "--"}
          </p>

          {/* ==================================================
              METRIC CARDS
          ================================================== */}

          <div className="grid grid-cols-4 gap-6 mt-10">

            <MetricCard
              title="CPU Usage"
              value={
                metrics?.cards?.cpu != null
                  ? `${metrics.cards.cpu}%`
                  : "--"
              }
              color="text-green-400"
            />

            <MetricCard
              title="Memory"
              value={
                metrics?.cards?.memory != null
                  ? `${metrics.cards.memory}%`
                  : "--"
              }
              color="text-yellow-400"
            />

            <MetricCard
              title="Storage"
              value={
                metrics?.cards?.storage != null
                  ? `${metrics.cards.storage}%`
                  : "--"
              }
              color="text-cyan-400"
            />

            <MetricCard
              title="Network"
              value={
                networkTotalKB !== null
                  ? `${networkTotalKB} KB`
                  : "--"
              }
              color="text-blue-400"
            />

          </div>

          {/* ==================================================
              REAL AWS METRIC CHARTS
          ================================================== */}

          <div className="grid grid-cols-2 gap-6 mt-10">

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

          {/* ==================================================
              AWS RESOURCE SUMMARY + ALERTS
          ================================================== */}

          <div className="grid grid-cols-2 gap-6 mt-10">

            <ResourceSummary
              resources={resources}
            />

            <RecentAlerts
              alerts={alerts}
            />

          </div>

          {/* ==================================================
              ACTIVITY TIMELINE
          ================================================== */}

          <div className="mt-10">

            <ActivityTimeline
              timeline={timeline}
            />

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
