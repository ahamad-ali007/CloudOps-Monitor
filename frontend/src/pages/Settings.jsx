import {
  Server,
  Clock,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const refreshInterval =
    import.meta.env.VITE_REFRESH_INTERVAL || "30";

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar connected />

        <main className="p-8">

          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold">
              Settings
            </h2>

            <p className="mt-2 text-gray-400">
              CloudOps Monitor configuration and system information
            </p>
          </div>

          {/* Configuration */}
          <div className="mt-10 grid grid-cols-2 gap-6">

            {/* API */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

              <div className="flex items-center gap-3">
                <Server
                  size={22}
                  className="text-cyan-400"
                />

                <h3 className="text-xl font-semibold">
                  Backend API
                </h3>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-400">
                  API Base URL
                </p>

                <p className="mt-2 break-all rounded-lg bg-slate-900 p-3 font-mono text-sm text-cyan-300">
                  {apiUrl}
                </p>
              </div>

            </div>

            {/* Refresh */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

              <div className="flex items-center gap-3">
                <Clock
                  size={22}
                  className="text-blue-400"
                />

                <h3 className="text-xl font-semibold">
                  Monitoring
                </h3>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-400">
                  Dashboard Refresh Interval
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-400">
                  {refreshInterval} seconds
                </p>
              </div>

            </div>

          </div>

          {/* Authentication */}
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800 p-6">

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={22}
                className="text-green-400"
              />

              <h3 className="text-xl font-semibold">
                Authentication
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-gray-400">
                  Authentication Method
                </p>

                <p className="mt-2 font-semibold text-green-400">
                  JWT Bearer Token
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Session Status
                </p>

                <p className="mt-2 font-semibold text-green-400">
                  Authenticated
                </p>
              </div>

            </div>

          </div>

          {/* Environment Notice */}
          <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">

            <h3 className="font-semibold text-yellow-400">
              Environment Configuration
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Configuration values are read from environment
              variables. Sensitive credentials and JWT secrets
              should never be exposed through the frontend.
            </p>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Settings;