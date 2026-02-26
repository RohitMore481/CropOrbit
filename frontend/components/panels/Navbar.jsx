import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-green-400 tracking-wide">
        Stress-Vision Dashboard
      </h1>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-green-400 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <User size={20} className="text-gray-400" />
          <span className="text-gray-300 text-sm">Farmer Admin</span>
        </div>
      </div>
    </div>
  );
}