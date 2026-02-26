import React from 'react';
import Navbar from '../components/panels/Navbar';
import Sidebar from '../components/panels/Sidebar';
import AnalyticsPanel from '../components/dashboard/AnalyticsPanel';
import MapView from '../components/map/MapContainer';
import Reports from './Reports';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
    const { isReportsOpen } = useAppContext();

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 relative">
            <Navbar />

            {/* The Main Dashboard View */}
            <div className="flex-1 flex overflow-hidden relative w-full h-full">
                <Sidebar className="z-10" />
                <div className="flex-1 relative z-0 h-full w-full">
                    <MapView />
                </div>
                <AnalyticsPanel className="z-10" />
            </div>

            {/* The Reports Overlay View */}
            {isReportsOpen && (
                <div className="absolute top-16 left-0 right-0 bottom-0 z-30 bg-slate-50 animation-fade-in shadow-2xl overflow-hidden flex flex-col">
                    <Reports />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
