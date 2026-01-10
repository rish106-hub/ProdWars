import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const ResultPage = () => {
    const navigate = useNavigate();
    const { attempts } = useApp();

    const today = new Date().toISOString().split('T')[0];
    const todayAttempts = attempts.filter(a => a.timestamp.startsWith(today));
    const correctCount = todayAttempts.filter(a => a.isCorrect).length;

    return (
        <div className="flex flex-col min-h-screen p-6 max-w-[450px] mx-auto overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center border-4 ${correctCount > 0 ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        <div className={`w-4 h-4 rounded-full ${correctCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-shake'}`} />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-5xl font-black text-white tracking-tighter text-glow">
                            {correctCount > 0 ? 'TRUTH COUNTED.' : 'ZERO.'}
                        </h1>
                        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">
                            Daily Protocol Result
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <p className="text-xl font-medium text-slate-400 max-w-[280px]">
                        {correctCount > 0
                            ? 'Your preparation state has been verified and recorded.'
                            : 'Truth can be brutal, but silence is deadlier. Try again tomorrow.'}
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-12 pb-8 space-y-4"
            >
                <Button
                    onClick={() => navigate('/')}
                    className="w-full h-20 bg-white text-black font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
                >
                    Back to Hub
                </Button>
                <Button
                    onClick={() => navigate('/history')}
                    variant="ghost"
                    className="w-full h-14 text-slate-600 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                    Audit Recall History
                </Button>
            </motion.div>
        </div>
    );
};

export default ResultPage;
