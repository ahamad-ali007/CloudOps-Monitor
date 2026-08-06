function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-8 py-5">
      <div>
        <h1 className="text-3xl font-bold text-white">
          CloudOps Monitor
        </h1>

        <p className="text-gray-400 text-sm">
          Intelligent AWS Infrastructure Monitoring System
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
          A
        </div>

        <div>
          <p className="font-semibold">Admin</p>
          <p className="text-xs text-gray-400">
            Cloud Administrator
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;