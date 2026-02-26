import React, { useState } from 'react';
import { Layers, Info } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Legend = () => {
    const { stressResults } = useAppContext();
    const [minimized, setMinimized] = useState(false);

    if (!stressResults?.summary) return null;

    const { health_score, stress_percentage } = stressResults.summary;

    if (minimized) {
        return (
            <div className="absolute bottom-6 left-6 z-[1000]">
                <button
                    onClick={() => setMinimized(false)}
                    className="bg-white p-3 rounded-full shadow-lg border border-slate-200 text-slate-700 hover:text-agri-dark hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-agri-green"
                    title="Show Legend"
                >
                    <Layers size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="absolute bottom-6 left-6 z-[1000] bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-72 transition-all duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Layers size={16} className="text-slate-500" />
                    Stress-Vision Legend
                </h4>
                <button
                    onClick={() => setMinimized(true)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <span className="sr-only">Minimize</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className="space-y-4">

                {/* Gradient Bar */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Stress Probability Scale
                    </p>

                    <div className="h-3 w-full rounded bg-gradient-to-r from-green-500 via-amber-400 to-red-500"></div>

                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0.0</span>
                        <span>0.5</span>
                        <span>1.0</span>
                    </div>
                </div>

                {/* Category Labels */}
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded bg-green-500 opacity-70"></div>
                        <span className="text-sm text-slate-700">Healthy (0.0 - 0.4)</span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5">
                        <div className="w-4 h-4 rounded bg-amber-500 opacity-70"></div>
                        <span className="text-sm text-slate-700">Early Stress (0.4 - 0.7)</span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5">
                        <div className="w-4 h-4 rounded bg-red-500 opacity-70"></div>
                        <span className="text-sm text-slate-700">Severe Stress (0.7 - 1.0)</span>
                    </div>
                </div>

                {/* Dynamic Summary */}
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <p><strong>Field Health Score:</strong> {health_score}</p>
                    <p><strong>Stress Percentage:</strong> {stress_percentage}%</p>
                </div>

                {/* Explanation */}
                <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                    <Info size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                    <p>
                        Overlay represents AI-derived pre-visual crop stress probability
                        computed from multi-spectral vegetation indices and thermal signals.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Legend;