import { useEffect, useState } from "react";
import Navbar from "../components/panels/Navbar";
import Sidebar from "../components/panels/Sidebar";
import AnalyticsPanel from "../components/dashboard/AnalyticsPanel";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with real API call later
    const mockResponse = {
      summary: {
        health_score: 74,
        stress_percentage: 18,
      },
      fields: {
        field1: {
          stress_matrix: Array(10).fill(Array(10).fill(0)),
          metrics: {},
        },
        field2: {
          stress_matrix: Array(8).fill(Array(8).fill(0)),
          metrics: {},
        },
      },
    };

    setTimeout(() => {
      setData(mockResponse);
    }, 800);
  }, []);

  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <AnalyticsPanel data={data} />
        </div>
      </div>
    </div>
  );
}