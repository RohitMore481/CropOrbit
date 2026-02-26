import React from 'react';
import { useAppContext } from '../context/AppContext';

const Reports = () => {

  const { reports } = useAppContext();

  return (
    <div className="h-full overflow-y-auto p-8 bg-slate-50">

      <h2 className="text-xl font-bold mb-6">
        Analysis Reports
      </h2>

      {!reports || reports.length === 0 ? (
        <p className="text-slate-500">
          No reports generated yet.
        </p>
      ) : (
        <div className="space-y-4">

          {reports.map((report) => (

            <div
              key={report.id}
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
            >

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">
                  Field: {report.fieldId}
                </h3>

                <span className="text-sm text-slate-400">
                  {report.date}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-slate-500">Health Score</p>
                  <p className="font-bold text-agri-green">
                    {report.summary?.health_score ?? 0}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Stress %</p>
                  <p className="font-bold text-red-500">
                    {report.summary?.stress_percentage ?? 0}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Area Under Stress</p>
                  <p className="font-bold text-amber-500">
                    {report.summary?.area_under_stress ?? 0}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Confidence</p>
                  <p className="font-bold text-indigo-500">
                    {report.summary?.confidence_score ?? 0}%
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Reports;