import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, AlertTriangle, ShieldCheck, Thermometer } from 'lucide-react';

const COLORS = ['#10b981', '#ef4444'];

const AnalyticsPanel = () => {

  const { stressResults } = useAppContext();

  const summary = stressResults?.summary;

  if (!summary) {
    return (
      <div className="w-96 bg-white border-l border-slate-200 p-6 flex items-center justify-center">
        <p className="text-slate-500 text-sm">
          Run analysis to see field insights
        </p>
      </div>
    );
  }

  const healthScore = summary.health_score || 0;
  const stressPercent = summary.stress_percentage || 0;
  const areaUnderStress = summary.area_under_stress || 0;
  const confidenceScore = summary.confidence_score || 0;

  // Optional derived temperature proxy (NDVI-based visual indicator)
  const temperatureProxy = (100 - healthScore).toFixed(2);

  const chartData = [
    { name: 'Healthy', value: healthScore },
    { name: 'Stressed', value: stressPercent }
  ];

  return (
    <div className="w-96 bg-white border-l border-slate-200 p-6 flex flex-col">

      <h2 className="text-lg font-bold text-slate-800 mb-6">
        Field Analytics
      </h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="p-4 rounded-xl bg-slate-50 border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-agri-green" />
            <p className="text-xs text-slate-500">Health Score</p>
          </div>
          <p className="text-2xl font-bold text-agri-green">
            {healthScore.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-xs text-slate-500">Stress %</p>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {stressPercent.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="text-xs text-slate-500">Area Under Stress</p>
          </div>
          <p className="text-2xl font-bold text-amber-500">
            {areaUnderStress.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-indigo-500" />
            <p className="text-xs text-slate-500">Confidence Score</p>
          </div>
          <p className="text-2xl font-bold text-indigo-500">
            {confidenceScore.toFixed(2)}%
          </p>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Health Distribution
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature / Stress Indicator */}
      <div className="mt-auto p-4 rounded-xl bg-slate-50 border">
        <div className="flex items-center gap-2 mb-2">
          <Thermometer size={16} className="text-orange-500" />
          <p className="text-xs text-slate-500">Thermal Stress Indicator</p>
        </div>
        <p className="text-lg font-semibold text-orange-500">
          {temperatureProxy}% Relative Heat Risk
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Derived from vegetation health anomaly
        </p>
      </div>

    </div>
  );
};

export default AnalyticsPanel;