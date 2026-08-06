import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="mt-2 text-gray-400">
            Welcome to CloudOps Monitor
          </p>
                    <div className="grid grid-cols-4 gap-6 mt-10">

    <MetricCard
        title="CPU Usage"
        value="45%"
        color="text-green-400"
    />

    <MetricCard
        title="Memory"
        value="68%"
        color="text-yellow-400"
    />

    <MetricCard
        title="Storage"
        value="74%"
        color="text-cyan-400"
    />

    <MetricCard
        title="Network"
        value="Healthy"
        color="text-blue-400"
    />

</div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;