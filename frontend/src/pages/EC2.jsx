import { useEffect, useState } from "react";
import { Server, RefreshCw } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getResources } from "../services/dashboardService";

function EC2() {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getResources();
      setResources(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load EC2 resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const timeout = setTimeout(() => {
    loadResources();
  }, 0);

  const interval = setInterval(() => {
    loadResources();
  }, 30000);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);

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
                EC2 Instances
              </h2>

              <p className="mt-2 text-gray-400">
                AWS EC2 infrastructure overview
              </p>
            </div>

            <button
              onClick={loadResources}
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
          {loading && !resources && (
            <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
              <p className="text-gray-400">
                Loading EC2 resources...
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

          {/* Resource cards */}
          {resources && (
            <div className="mt-10 grid grid-cols-4 gap-6">

              {/* Running */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Running
                  </p>

                  <Server
                    size={22}
                    className="text-green-400"
                  />
                </div>

                <p className="mt-4 text-4xl font-bold text-green-400">
                  {resources.running_ec2 ?? 0}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Running EC2 instances
                </p>
              </div>

              {/* Stopped */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Stopped
                  </p>

                  <Server
                    size={22}
                    className="text-red-400"
                  />
                </div>

                <p className="mt-4 text-4xl font-bold text-red-400">
                  {resources.stopped_ec2 ?? 0}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Stopped EC2 instances
                </p>
              </div>

              {/* Pending */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Pending
                  </p>

                  <Server
                    size={22}
                    className="text-yellow-400"
                  />
                </div>

                <p className="mt-4 text-4xl font-bold text-yellow-400">
                  {resources.pending_ec2 ?? 0}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Pending EC2 instances
                </p>
              </div>

              {/* Total */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Total
                  </p>

                  <Server
                    size={22}
                    className="text-cyan-400"
                  />
                </div>

                <p className="mt-4 text-4xl font-bold text-cyan-400">
                  {resources.total_ec2 ?? 0}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Total EC2 instances
                </p>
              </div>

            </div>
          )}

          {/* Additional AWS resources */}
          {resources && (
            <div className="mt-8 grid grid-cols-2 gap-6">

              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <p className="text-sm text-gray-400">
                  S3 Buckets
                </p>

                <p className="mt-3 text-3xl font-bold text-cyan-400">
                  {resources.s3 ?? 0}
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                <p className="text-sm text-gray-400">
                  Lambda Functions
                </p>

                <p className="mt-3 text-3xl font-bold text-purple-400">
                  {resources.lambda_functions ?? 0}
                </p>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default EC2;