import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Target, ShieldAlert } from 'lucide-react';

const WeeklyReport = () => {
    const navigate = useNavigate();
    const { concepts, getTruthMetrics } = useApp();
    const metrics = getTruthMetrics();

    if (!metrics) return null;

    // A concept is a "lie" if deceptionCount > 0
    const deceptions = concepts
        .filter(c => (c.deceptionCount || 0) > 0)
        .sort((a, b) => (b.deceptionCount || 0) - (a.deceptionCount || 0));

    const totalDeceptions = deceptions.reduce((acc, c) => acc + (c.deceptionCount || 0), 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
            <motion.header variants={itemVariants} className="pt-8 pb-10">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="text-red-500" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Weekly Auditor</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none mb-2">Lies I Told Myself.</h1>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Diagnostic Audit of Self-Deception</p>
            </motion.header>

            <div className="space-y-6 flex-1">
                {/* Deception Score Card */}
                <motion.section variants={itemVariants} className="p-8 rounded-[2.5rem] bg-red-500/10 border-2 border-red-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <AlertCircle size={80} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-4">Total Deception Events</p>
                        <p className="text-6xl font-black text-white tracking-tighter mb-2">{totalDeceptions}</p>
                        <p className="text-sm font-bold text-slate-400 leading-relaxed max-w-[200px]">
                            Moments where you felt stable but recall collapsed under pressure.
                        </p>
                    </div>
                </motion.section>

                {/* The "Lies" List */}
                <motion.section variants={itemVariants} className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 px-2">Critical Vulnerabilities</h2>
                    <div className="space-y-2">
                        {deceptions.length > 0 ? deceptions.slice(0, 3).map((c, i) => (
                            <div key={c.id} className="p-6 rounded-3xl glass-card flex justify-between items-center group">
                                <div>
                                    <p className="text-white font-black text-lg tracking-tight group-hover:text-red-400 transition-colors">{c.name}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{c.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-red-500 font-black text-xl leading-none">{c.deceptionCount}</p>
                                    <p className="text-[8px] text-slate-600 font-black uppercase tracking-tighter">Fails</p>
                                </div>
                            </div>
                        )) : (
                            <div className="p-10 text-center rounded-3xl bg-white/5 border border-white/5">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No significant lies detected yet.</p>
                                <p className="text-[10px] text-slate-600 mt-2 font-medium">Keep completing daily checks to audit your memory.</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="p-7 rounded-[2rem] glass-card space-y-2">
                        <Target className="text-green-500" size={18} />
                        <p className="text-3xl font-black text-white tracking-tighter">{metrics.stableCount}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">Verified Stable</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="p-7 rounded-[2rem] glass-card space-y-2">
                        <TrendingDown className="text-red-500" size={18} />
                        <p className="text-3xl font-black text-white tracking-tighter">{metrics.decayingCount}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">Silent Decay</p>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="pt-6">
                    <Button
                        onClick={() => navigate('/recall')}
                        className="w-full h-20 bg-white text-black font-black text-xl rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
                    >
                        Verify More Truth
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WeeklyReport;
