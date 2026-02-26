import Navbar from "../components/panels/Navbar";
import Sidebar from "../components/panels/Sidebar";

export default function Reports() {
  return (
    <div className="flex bg-gray-950 text-white">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-6">
            Field Stress Reports
          </h2>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-gray-400">
              Reports and analytics summary will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}