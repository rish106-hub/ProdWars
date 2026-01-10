import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, LogOut, Shield, Globe, Award } from 'lucide-react';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { profile, setProfile } = useApp();

    const handleLogout = () => {
        // Basic clear for demo (in real app would handle auth logout)
        localStorage.clear();
        window.location.href = '/';
    };

    const toggleExam = () => {
        if (!profile) return;
        setProfile({
            ...profile,
            examType: profile.examType === 'SSC' ? 'Banking' : 'SSC'
        });
    };

    const toggleLang = () => {
        if (!profile) return;
        setProfile({
            ...profile,
            language: profile.language === 'English' ? 'Hindi' : 'English'
        });
    };

    return (
        <div className="flex flex-col min-h-screen p-6">
            <header className="flex items-center gap-4 py-8">
                <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
            </header>

            <div className="flex-1 space-y-2">
                <section className="py-4 space-y-6">
                    <button
                        onClick={toggleExam}
                        className="w-full flex items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800"
                    >
                        <div className="flex items-center gap-4">
                            <Award className="text-slate-500" size={24} />
                            <div className="text-left">
                                <p className="font-bold text-white">Target Exam</p>
                                <p className="text-sm text-slate-500">{profile?.examType || 'SSC'}</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Change</span>
                    </button>

                    <button
                        onClick={toggleLang}
                        className="w-full flex items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800"
                    >
                        <div className="flex items-center gap-4">
                            <Globe className="text-slate-500" size={24} />
                            <div className="text-left">
                                <p className="font-bold text-white">Language</p>
                                <p className="text-sm text-slate-500">{profile?.language || 'English'}</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Change</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 opacity-50 cursor-not-allowed">
                        <div className="flex items-center gap-4">
                            <Shield className="text-slate-500" size={24} />
                            <div className="text-left">
                                <p className="font-bold text-white">Protocol Level</p>
                                <p className="text-sm text-slate-500">Strict</p>
                            </div>
                        </div>
                    </button>
                </section>
            </div>

            <div className="pb-8">
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full h-14 text-red-500 hover:text-red-400 hover:bg-red-500/10 gap-3"
                >
                    <LogOut size={20} />
                    <span className="font-bold">Logout</span>
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;
