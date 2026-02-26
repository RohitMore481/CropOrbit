import React from 'react';
import { useAppContext } from '../context/AppContext';
import { fieldsData } from '../components/map/fieldsData';
import { FileText, ArrowRight, X } from 'lucide-react';

const Reports = () => {
    const { reports, setStressResults, setSelectedFields, setAnalysisType, setIsReportsOpen } = useAppContext();

    const handleViewReport = (report) => {
        // Restore context state to match the report
        setStressResults(report.fullResults);
        setSelectedFields(report.fieldsAnalyzed);
        setAnalysisType(report.analysisType);

        // Close reports overlay to show dashboard
        setIsReportsOpen(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex-1 overflow-auto p-8 relative">
            <button
                onClick={() => setIsReportsOpen(false)}
                className="absolute top-6 right-8 p-2 text-slate-400 hover:text-slate-800 bg-white shadow-sm rounded-full border border-slate-200 transition-colors"
                title="Close Reports"
            >
                <X size={20} />
            </button>
            <div className="max-w-6xl mx-auto pt-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                        <FileText size={20} className="text-agri-green" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Analysis Reports ({reports.length})</h1>
                </div>

                {reports.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-dashed border-slate-300 p-12 text-center">
                        <h3 className="text-lg font-medium text-slate-700 mb-2">No Reports Yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Run your first AI analysis on the Dashboard to generate and save reports automatically.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date & Time</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Model</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Fields Analyzed</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Overall Health</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Avg Stress</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {reports.map((report) => {
                                    // Get friendly names for fields
                                    const fieldNames = report.fieldsAnalyzed.map(id => {
                                        const f = fieldsData.find(field => field.id === id);
                                        return f ? f.name : id;
                                    }).join(', ');

                                    const healthScore = report.summary.health_score;

                                    return (
                                        <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                                {formatDate(report.date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                                    {report.analysisType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate" title={fieldNames}>
                                                {fieldNames}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`font-semibold ${healthScore > 80 ? 'text-agri-green' : healthScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                                    {healthScore}/100
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                                                {report.summary.stress_percentage}%
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleViewReport(report)}
                                                    className="inline-flex items-center gap-1.5 text-agri-green hover:text-agri-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-agri-light/30 border border-transparent hover:border-agri-light"
                                                >
                                                    View <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
