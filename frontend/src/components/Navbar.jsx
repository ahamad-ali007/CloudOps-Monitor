function Navbar({ connected = true, onLogout }) {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-8 py-5">

      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          CloudOps Monitor
        </h1>

        <p className="text-sm text-gray-400">
          Intelligent AWS Infrastructure Monitoring System
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">

        {/* API Status */}
        <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-2 border border-slate-700">

          <div
            className={`h-3 w-3 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />

          <div>
            <p className="text-sm font-semibold">
              {connected ? "API Connected" : "API Offline"}
            </p>

            <p className="text-xs text-gray-400">
              Updated {currentTime}
            </p>
          </div>

        </div>

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            A
          </div>

          <div>
            <p className="font-semibold">Admin</p>

            <p className="text-xs text-gray-400">
              Cloud Administrator
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;