import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Leaf } from 'lucide-react';

const Login = () => {
    const { setUser } = useAppContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleMockGoogleLogin = () => {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setUser({
                uid: 'user-123',
                displayName: 'Agri Investor',
                email: 'investor@agritech.com',
                photoURL: 'https://ui-avatars.com/api/?name=Agri+Investor&background=10b981&color=fff'
            });
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-agri-light rounded-2xl flex items-center justify-center mb-4 text-agri-dark">
                        <Leaf size={32} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Stress-Vision</h2>
                    <p className="text-slate-500 mt-2 text-center text-sm">
                        AI-powered precision agriculture monitoring dashboard
                    </p>
                </div>

                <button
                    onClick={handleMockGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium rounded-xl py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-agri-green focus:ring-offset-1 disabled:opacity-75"
                >
                    {loading ? (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-agri-green animate-spin" />
                    ) : (
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    )}
                    <span>Sign up with Google</span>
                </button>

                <p className="mt-8 text-center text-xs text-slate-400">
                    This is a simulated analytics dashboard for demonstration.
                </p>
            </div>
        </div>
    );
};

export default Login;
