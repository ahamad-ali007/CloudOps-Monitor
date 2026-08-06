import useDashboard from "../hooks/useDashboard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import MetricChart from "../components/MetricChart";
import ResourceSummary from "../components/ResourceSummary";
import RecentAlerts from "../components/RecentAlerts";
import ActivityTimeline from "../components/ActivityTimeline";

function Dashboard() {

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
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar connected={!error} />

        <main className="p-8">
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>
          <p className="mt-2 text-gray-400">
                 Region: {dashboard?.region ?? "--"} •
                 Health: {dashboard?.health ?? "--"}% •
                 Services: {dashboard?.running_services ?? "--"}
            </p>

    <div className="grid grid-cols-4 gap-6 mt-10">

       <MetricCard
    title="CPU Usage"
    value={metrics?.cards?.cpu ?? "--"}
    color="text-green-400"
/>

<MetricCard
    title="Memory"
    value={metrics?.cards?.memory ?? "--"}
    color="text-yellow-400"
/>

<MetricCard
    title="Storage"
    value={metrics?.cards?.storage ?? "--"}
    color="text-cyan-400"
/>

<MetricCard
    title="Network"
    value={metrics?.cards?.network ?? "--"}
    color="text-blue-400"
/>

    </div>

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

    <div className="grid grid-cols-2 gap-6 mt-10">
         <ResourceSummary resources={resources} />
         <RecentAlerts alerts={alerts} />
    </div>

    <div className="mt-10">
         <ActivityTimeline timeline={timeline} />
    </div>
    
        </main>
      </div>
    </div>
  );
}

export default Dashboard;