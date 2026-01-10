import { motion } from 'framer-motion';
import type { ConceptStatus } from '@/types';

interface Topic {
    name: string;
    stability: number;
    status: ConceptStatus;
}

interface StabilityHeatmapProps {
    topics: Topic[];
}

const StabilityHeatmap: React.FC<StabilityHeatmapProps> = ({ topics }) => {
    const displayTopics = topics.slice(0, 4);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Recall Stability Matrix</h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Stable</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Decay</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {displayTopics.map((topic, i) => (
                    <motion.div
                        key={topic.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="relative group cursor-help"
                    >
                        <div
                            className={`aspect-square rounded-2xl border transition-all duration-500 ${topic.status === 'Stable' ? 'bg-green-500/20 border-green-500/30' :
                                topic.status === 'Decaying' ? 'bg-red-500/20 border-red-500/30 animate-pulse' :
                                    topic.status === 'Unstable' ? 'bg-yellow-500/10 border-yellow-500/20' :
                                        'bg-white/5 border-white/5'
                                }`}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-24 text-center">
                            <p className="text-[8px] font-black text-white uppercase tracking-tighter truncate">{topic.name}</p>
                            <p className="text-[10px] font-black text-white">{Math.round(topic.stability * 100)}%</p>
                        </div>
                    </motion.div>
                ))}

                {/* Fixed 4-slot grid look */}
                {Array.from({ length: Math.max(0, 4 - displayTopics.length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.02]" />
                ))}
            </div>
        </div>
    );
};

export default StabilityHeatmap;
