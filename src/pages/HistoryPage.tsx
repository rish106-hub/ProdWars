import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';

const HistoryPage = () => {
    const navigate = useNavigate();
    const { sessions } = useApp();

    // Sort sessions by date descending
    const sortedSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="flex flex-col min-h-screen p-6">
            <header className="flex items-center gap-4 py-8">
                <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-white">History</h1>
            </header>

            <div className="flex-1 space-y-4">
                {sortedSessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                        <p className="font-medium uppercase tracking-widest text-xs">No history yet</p>
                    </div>
                ) : (
                    sortedSessions.map((session, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50"
                        >
                            <div className="space-y-1">
                                <p className="font-bold text-white">
                                    {new Date(session.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                    {session.questionsCount} Questions
                                </p>
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${session.completed ? 'bg-white text-black' : 'bg-slate-800 text-slate-400'}`}>
                                {session.completed ? 'Counted' : 'Zero'}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className="pt-8 mb-6">
                <Button
                    onClick={() => navigate('/recall')}
                    className="w-full h-14 bg-white text-black font-bold"
                >
                    Daily Recall
                </Button>
            </div>
        </div>
    );
};

export default HistoryPage;
