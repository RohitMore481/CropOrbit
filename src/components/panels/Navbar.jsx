import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { LogOut, Leaf, LayoutDashboard, FileText, Menu, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, setUser, isReportsOpen, setIsReportsOpen } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800 text-white h-16 px-6 flex items-center justify-between shrink-0 shadow-lg relative z-20">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-agri-green">
                    <Leaf size={24} className="text-agri-green" />
                    <span className="text-xl font-bold tracking-tight text-white">Crop Orbit</span>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => setIsReportsOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isReportsOpen
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setIsReportsOpen(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isReportsOpen
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <FileText size={18} />
                        Reports
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>
                {user && (
                    <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-slate-200">{user.displayName}</p>
                                <p className="text-xs text-slate-500">Agri Investor</p>
                            </div>
                            <img src={user.photoURL} alt={user.displayName} className="w-9 h-9 rounded-full border border-slate-700" />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                )}
                <button className="md:hidden text-slate-400 hover:text-white p-2">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
