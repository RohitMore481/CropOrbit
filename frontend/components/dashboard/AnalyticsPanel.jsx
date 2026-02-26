import { useMemo } from "react";

export default function AnalyticsPanel({ data }) {
  const healthColor = useMemo(() => {
    if (data?.summary?.health_score > 80) return "text-green-400";
    if (data?.summary?.health_score > 60) return "text-yellow-400";
    return "text-red-500";
  }, [data]);

  if (!data) {
    return (
      <div className="text-gray-400 text-center mt-10">
        Loading analytics...
      </div>
    );
  }

  const { summary, fields } = data;

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 text-sm">Overall Health Score</h3>
          <p className={`text-4xl font-bold mt-3 ${healthColor}`}>
            {summary.health_score}%
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 text-sm">Stress Percentage</h3>
          <p className="text-4xl font-bold text-red-400 mt-3">
            {summary.stress_percentage}%
          </p>
        </div>
      </div>

      {/* Fields Section */}
      <div>
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Field Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(fields).map((fieldKey) => (
            <div
              key={fieldKey}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {fieldKey.toUpperCase()}
              </h3>

              <p className="text-gray-400 text-sm">
                Stress Matrix Size:
              </p>
              <p className="text-green-400 font-bold">
                {fields[fieldKey].stress_matrix.length} x{" "}
                {fields[fieldKey].stress_matrix[0]?.length || 0}
              </p>

              <p className="text-gray-500 text-xs mt-4">
                Metrics integration ready
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}