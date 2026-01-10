import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertTriangle, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import StabilityHeatmap from '@/components/dashboard/StabilityHeatmap';

const Dashboard = () => {
    const navigate = useNavigate();
    const { profile, sessions, getTruthMetrics } = useApp();
    const metrics = getTruthMetrics();

    const today = new Date().toISOString().split('T')[0];
    const isTodayDone = sessions.some(s => s.date === today);

    if (!metrics) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col min-h-screen p-6 pb-24 max-w-[450px] mx-auto overflow-hidden"
        >
            {/* Header */}
            <motion.header variants={itemVariants} className="pt-8 pb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter text-glow">Recall OS</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-white/10 text-slate-300 px-3 py-1 rounded-full uppercase font-black tracking-widest backdrop-blur-sm border border-white/5">
                            {profile?.examType} Context
                        </span>
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none ml-1">
                            Day {sessions.length + 1}
                        </span>
                    </div>
                </div>
            </motion.header>

            <div className="space-y-6 flex-1">
                {/* Primary Action: Daily Recall Check */}
                <motion.section
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden p-6 rounded-[2.5rem] border transition-all duration-500 ${isTodayDone ? 'glass-card' : 'bg-white border-white shadow-[0_20px_50px_rgba(255,255,255,0.1)]'}`}
                    onClick={() => !isTodayDone && navigate('/recall')}
                >
                    {!isTodayDone && (
                        <div className="absolute top-0 right-0 p-5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-3">
                        <h2 className={`font-black uppercase tracking-[0.2em] text-[10px] ${isTodayDone ? 'text-slate-500' : 'text-slate-400'}`}>
                            Daily Truth Check
                        </h2>
                        {isTodayDone && <CheckCircle2 className="text-green-500" size={18} />}
                    </div>

                    <h3 className={`text-2xl font-black mb-1 tracking-tight ${isTodayDone ? 'text-slate-400' : 'text-black'}`}>
                        {isTodayDone ? 'Truth Counted' : 'Pending Recall'}
                    </h3>
                    <p className={`text-xs leading-relaxed font-semibold mb-6 ${isTodayDone ? 'text-slate-500' : 'text-slate-600'}`}>
                        {isTodayDone ? 'Your preparation state is recorded. Rest now.' : '4-6 concepts ready for validation.'}
                    </p>

                    {!isTodayDone && (
                        <Button
                            className="w-full h-14 bg-black text-white font-black text-md hover:bg-slate-900 rounded-2xl transition-all active:scale-95"
                            onClick={() => navigate('/recall')}
                        >
                            Start Recall
                        </Button>
                    )}
                </motion.section>

                {/* Prediction & Readiness Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="p-5 rounded-[2rem] glass-card space-y-1 group">
                        <Target className="text-slate-500 group-hover:text-white transition-colors" size={18} />
                        <p className="text-3xl font-black text-white tracking-tighter">{metrics.readinessIndex}%</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.15em]">Readiness</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="p-5 rounded-[2rem] glass-card border-none bg-indigo-500/10 space-y-1 group">
                        <Zap className="text-indigo-400 group-hover:text-white transition-colors animate-pulse" size={18} />
                        <p className="text-3xl font-black text-white tracking-tighter">{metrics.mistakeConversionCount}</p>
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.15em]">Converted</p>
                    </motion.div>
                </div>

                {/* Stability Heatmap (Diagnostic Feature) */}
                <motion.section variants={itemVariants} className="p-8 rounded-[2.5rem] glass-card">
                    <StabilityHeatmap topics={metrics.topics} />
                </motion.section>

                {/* Illusion Check (Exposure vs Retention) */}
                <motion.section
                    variants={itemVariants}
                    className={`p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${metrics.isIllusionHigh
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'glass-card border-white/5'}`}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className={metrics.isIllusionHigh ? 'text-red-500' : 'text-slate-600'} size={18} />
                        <h2 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-500">Illusion Meter</h2>
                    </div>

                    {metrics.isIllusionHigh ? (
                        <div className="space-y-2">
                            <p className="text-red-400 font-black text-xl leading-tight">High Self-Deception</p>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold">
                                You feel <span className="text-white">{(profile?.initialConfidence || 0) * 10}%</span> ready, but verified recall is <span className="text-white">{Math.round(metrics.actualCompetence * 10)}%</span>.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-green-500 font-black text-xl leading-tight">Calibration Stable</p>
                            <p className="text-xs text-slate-500 font-bold">Perceived competence matches verified reality.</p>
                        </div>
                    )}
                </motion.section>

                {/* One last brutally honest line */}
                <motion.div variants={itemVariants} className="py-6 opacity-40">
                    <p className="text-[10px] text-slate-500 leading-relaxed text-center italic font-black tracking-widest uppercase">
                        "Decay is more dangerous than slow progress."
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
