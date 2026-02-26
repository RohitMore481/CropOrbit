import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend as RechartsLegend } from 'recharts';
import { ThermometerSun, AlertTriangle, ShieldCheck, MapPin, Activity, Map } from 'lucide-react';
import { fieldsData } from '../map/fieldsData';

const AnalyticsPanel = () => {
    const { stressResults, selectedFields } = useAppContext();

    // Show a placeholder if no data is available
    if (!stressResults?.summary || Object.keys(stressResults.fields).length === 0) {
        return (
            <div className="w-96 bg-slate-50 h-full border-l border-slate-200 flex flex-col shrink-0 items-center justify-center p-8 text-center transition-all duration-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                    <Activity size={24} className="text-slate-300" />
                </div>
                <h3 className="text-slate-700 font-medium mb-2">No Analytics Data</h3>
                <p className="text-sm text-slate-500">
                    Run an analysis on selected fields to display the comprehensive AI metrics and heatmaps.
                </p>
            </div>
        );
    }

    const { summary, fields } = stressResults;

    // Prepare pie chart data dynamically
    const pieData = [
        { name: 'Healthy', value: 100 - summary.stress_percentage },
        { name: 'Stressed', value: summary.stress_percentage }
    ];
    const COLORS = ['#10b981', '#f59e0b']; // Green and Orange/Yellow

    // Compute dynamic aggregate metrics from fields in the result
    const analyzedFields = Object.keys(fields).filter(fieldId => fields[fieldId]);
    const numFields = analyzedFields.length || 1;
    const allFieldsMetrics = analyzedFields.map(fieldId => fields[fieldId].metrics);

    const totalAreaStressed = allFieldsMetrics.reduce((sum, f) => sum + parseFloat(f.area_under_stress), 0).toFixed(1);
    const avgTemp = (allFieldsMetrics.reduce((sum, f) => sum + f.avg_temperature, 0) / numFields).toFixed(1);
    const overallConfidence = (allFieldsMetrics.reduce((sum, f) => sum + parseFloat(f.confidence), 0) / numFields * 100).toFixed(0);

    return (
        <div className="w-96 bg-slate-50 h-full border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto transition-all duration-500">
            {/* Header */}
            <div className="p-6 bg-white border-b border-slate-200 sticky top-0 z-10">
                <h2 className="text-lg font-bold text-slate-800">Analytics Dashboard</h2>
                <p className="text-xs text-slate-500 mt-1">AI processed multi-spectral data</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Prime Score Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between transform transition-transform hover:scale-[1.02]">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Overall Health Score</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className={`text-4xl font-black ${summary.health_score > 80 ? 'text-agri-green' : summary.health_score > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                {summary.health_score}
                            </h3>
                            <span className="text-sm font-medium text-slate-400">/ 100</span>
                        </div>
                    </div>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${summary.health_score > 80 ? 'bg-agri-light/40' : summary.health_score > 50 ? 'bg-amber-50' : 'bg-red-50'}`}>
                        <ShieldCheck size={28} className={summary.health_score > 80 ? 'text-agri-green' : summary.health_score > 50 ? 'text-amber-500' : 'text-red-500'} />
                    </div>
                </div>

                {/* Charts Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">Overall Composition</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={1500}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    formatter={(value) => [`${value}%`, 'Percentage']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <RechartsLegend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Overall Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <AlertTriangle size={16} className="text-rose-400" />
                            <p className="text-xs font-medium">Stressed Area</p>
                        </div>
                        <p className="text-xl font-bold text-slate-800">{totalAreaStressed} <span className="text-sm text-slate-500 font-normal">Ha</span></p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Activity size={16} className="text-amber-500" />
                            <p className="text-xs font-medium">Avg Stress</p>
                        </div>
                        <p className="text-xl font-bold text-slate-800">{summary.stress_percentage}%</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <ThermometerSun size={16} className="text-amber-500" />
                            <p className="text-xs font-medium">Avg Temp</p>
                        </div>
                        <p className="text-xl font-bold text-slate-800">{avgTemp}°C</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <MapPin size={16} className="text-indigo-400" />
                            <p className="text-xs font-medium">AI Confidence</p>
                        </div>
                        <p className="text-xl font-bold text-slate-800">{overallConfidence}%</p>
                    </div>
                </div>

                {/* Dynamic Field-Level Details */}
                {analyzedFields.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Field Details</h3>
                        <div className="space-y-4">
                            {analyzedFields.map((fieldId, index) => {
                                const fieldMetrics = fields[fieldId].metrics;
                                const fieldName = fieldsData.find(f => f.id === fieldId)?.name || fieldId;

                                // Calculate subtle delay for cascading animation
                                const animationStyle = {
                                    animationFillMode: 'both',
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.15}s forwards`
                                };

                                return (
                                    <div key={fieldId} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200" style={animationStyle}>
                                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Map size={16} className="text-agri-green" />
                                                <h4 className="font-semibold text-slate-800 text-sm">{fieldName}</h4>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${fieldMetrics.stress_percentage < 30 ? 'bg-agri-light text-agri-dark' :
                                                fieldMetrics.stress_percentage < 60 ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {fieldMetrics.stress_percentage}% Stress
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 overflow-hidden">
                                            <div className="min-w-0">
                                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium truncate">Area</p>
                                                <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{Number(fieldMetrics.area_under_stress).toFixed(1)} Ha</p>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium truncate">Temp</p>
                                                <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{Number(fieldMetrics.avg_temperature).toFixed(1)}°C</p>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium truncate">Quality</p>
                                                <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{(Number(fieldMetrics.confidence) * 100).toFixed(0)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {/* Adding the css keyframes definition for subtle animations directly inside index.css or dynamic component style */}
            <style jsx="true">{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default AnalyticsPanel;
