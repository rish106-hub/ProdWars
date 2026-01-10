import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-background p-8 max-w-[450px] mx-auto overflow-hidden">
            <div className="flex-1 flex flex-col justify-center space-y-12">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-black tracking-[0.3em] text-slate-500 mb-2">
                        The Truth Engine
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter leading-[0.9] text-glow">
                        RECALL<br />OS.
                    </h1>
                    <p className="text-xl font-medium text-slate-400 tracking-tight leading-relaxed max-w-[280px]">
                        Most aspirants fail because they <span className="text-white">forgot silently</span>.
                    </p>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 animate-pulse" />
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-loose">
                                Expose Illusions of competence <br />
                                Measure Preparation Decay <br />
                                Reward Recall Stability
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="pb-12"
            >
                <Button
                    onClick={() => navigate('/onboarding')}
                    className="w-full h-20 bg-white text-black font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.15)] active:scale-95 transition-all hover:bg-slate-100"
                >
                    Enter Protocol
                </Button>
                <p className="text-[10px] text-slate-600 text-center mt-6 font-black uppercase tracking-[0.2em]">
                    Closed-Book Only. Low Bandwidth. Pure Recall.
                </p>
            </motion.div>
        </div>
    );
};

export default LandingPage;
