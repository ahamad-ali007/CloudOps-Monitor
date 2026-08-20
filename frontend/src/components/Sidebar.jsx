import {
  LayoutDashboard,
  Monitor,
  Cloud,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "EC2",
      icon: Monitor,
      path: "/ec2",
    },
    {
      name: "CloudWatch",
      icon: Cloud,
      path: "/cloudwatch",
    },
    {
      name: "Alerts",
      icon: Bell,
      path: "/alerts",
    },
    {
      name: "Reports",
      icon: FileText,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">

      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          CloudOps
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Monitor Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-8">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 w-full px-6 py-4 transition ${
                active
                  ? "bg-slate-700 text-cyan-400 border-r-2 border-cyan-400"
                  : "text-gray-300 hover:bg-slate-700 hover:text-cyan-400"
              }`}
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