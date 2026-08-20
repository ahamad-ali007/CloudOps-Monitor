import { useEffect, useState } from "react";
import {
  Activity,
  Clock,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getTimeline } from "../services/dashboardService";

function Reports() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTimeline = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTimeline();

      const events = Array.isArray(data)
        ? data
        : data?.timeline ?? [];

      setTimeline(events);
    } catch (err) {
      console.error(err);
      setError("Unable to load activity report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const timeout = setTimeout(() => {
    loadTimeline();
  }, 0);

  const interval = setInterval(() => {
    loadTimeline();
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
                Reports
              </h2>

              <p className="mt-2 text-gray-400">
                CloudOps monitoring activity and system events
              </p>
            </div>

            <button
              onClick={loadTimeline}
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
              <div className="flex items-center gap-3">
                <Activity
                  size={22}
                  className="text-cyan-400"
                />

                <p className="text-sm text-gray-400">
                  Total Events
                </p>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {timeline.length}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <div className="flex items-center gap-3">
                <Clock
                  size={22}
                  className="text-blue-400"
                />

                <p className="text-sm text-gray-400">
                  Latest Event
                </p>
              </div>

              <p className="mt-4 text-2xl font-bold">
                {timeline.length > 0
                  ? timeline[0]?.time ?? "--"
                  : "--"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <p className="text-sm text-gray-400">
                Monitoring Status
              </p>

              <p className="mt-4 text-2xl font-bold text-green-400">
                Active
              </p>
            </div>

          </div>

          {/* Loading */}
          {loading && timeline.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
              <p className="text-gray-400">
                Loading activity report...
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

          {/* Empty */}
          {!loading && !error && timeline.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-10 text-center">
              <Activity
                size={40}
                className="mx-auto text-gray-500"
              />

              <h3 className="mt-4 text-xl font-semibold">
                No activity recorded
              </h3>

              <p className="mt-2 text-gray-400">
                No monitoring events are currently available.
              </p>
            </div>
          )}

          {/* Activity report */}
          {timeline.length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800">

              <div className="border-b border-slate-700 px-6 py-5">
                <h3 className="text-xl font-semibold">
                  Monitoring Activity
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Recent events generated by CloudOps Monitor
                </p>
              </div>

              <div className="divide-y divide-slate-700">

                {timeline.map((item, index) => (
                  <div
                    key={`${item.time}-${item.event}-${index}`}
                    className="flex items-center gap-5 px-6 py-5 hover:bg-slate-700/30 transition"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                      <Activity
                        size={19}
                        className="text-cyan-400"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-gray-200">
                        {item.event}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={15} />
                      {item.time ?? "--"}
                    </div>

                  </div>
                ))}

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Reports;