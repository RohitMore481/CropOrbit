import { LayoutDashboard, FileText, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-800";

  const activeStyle = "bg-green-600 text-white";

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 h-screen p-4">
      <h2 className="text-green-400 text-lg font-bold mb-8">
        🌾 Stress-Vision
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-400"}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-400"}`
          }
        >
          <FileText size={18} />
          Reports
        </NavLink>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition mt-6">
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </div>
  );
}