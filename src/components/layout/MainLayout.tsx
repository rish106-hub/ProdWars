import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, BarChart2, Settings, Home } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile } = useApp();

    const navItems = [
        { label: 'Home', path: '/', icon: Home },
        { label: 'Truth', path: '/weekly', icon: BarChart2 },
        { label: 'History', path: '/history', icon: Calendar },
        { label: 'System', path: '/settings', icon: Settings },
    ];

    // Don't show nav on onboarding, recall session, or if no profile exists
    const hideNav = !profile || ['/onboarding', '/recall'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1">
                {children}
            </div>

            {!hideNav && (
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] bg-background border-t border-slate-800/50 flex justify-around items-center py-4 px-6 z-50">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                            >
                                {isActive ? (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white mb-1" />
                                ) : (
                                    <Icon size={20} />
                                )}
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            )}
        </div>
    );
};

export default MainLayout;
