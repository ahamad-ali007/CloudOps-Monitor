import {
  LayoutDashboard,
  Monitor,
  Cloud,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "EC2", icon: Monitor },
    { name: "CloudWatch", icon: Cloud },
    { name: "Alerts", icon: Bell },
    { name: "Reports", icon: FileText },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          CloudOps
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Monitor Platform
        </p>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="flex items-center gap-4 w-full px-6 py-4 text-gray-300 hover:bg-slate-700 hover:text-cyan-400 transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;