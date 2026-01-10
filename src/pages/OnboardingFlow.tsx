import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import type { ExamType, Language, UserProfile } from '@/types';

const OnboardingFlow = () => {
    const navigate = useNavigate();
    const { setProfile } = useApp();
    const [step, setStep] = useState(1);
    const [examType, setExamType] = useState<ExamType>('SSC');
    const [attemptNumber, setAttemptNumber] = useState(1);
    const [confidence, setConfidence] = useState(5);
    const [committed, setCommitted] = useState(false);

    const handleComplete = () => {
        const profile: UserProfile = {
            examType,
            attemptNumber,
            language: 'English', // Simplified for MVP
            initialConfidence: confidence
        };
        setProfile(profile);
        navigate('/');
    };

    const steps = [
        {
            title: "Your Context",
            subtitle: "Set the diagnostic baseline.",
            content: (
                <div className="space-y-10 pt-4">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 block px-2">Primary Target</label>
                        <div className="grid grid-cols-2 gap-4">
                            {['SSC', 'Banking'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setExamType(type as ExamType)}
                                    className={`h-24 rounded-2xl font-black text-xl transition-all ${examType === type
                                            ? 'bg-white text-black shadow-xl scale-[1.02]'
                                            : 'bg-white/5 text-slate-500 border border-white/5'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 block px-2">Attempt Number</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setAttemptNumber(num)}
                                    className={`h-16 rounded-xl font-black transition-all ${attemptNumber === num
                                            ? 'bg-white text-black shadow-lg scale-105'
                                            : 'bg-white/5 text-slate-500 border border-white/5 text-sm'
                                        }`}
                                >
                                    {num === 3 ? '3+' : num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "The Illusion",
            subtitle: "How ready do you feel right now? (0-10)",
            content: (
                <div className="space-y-12 py-10">
                    <div className="text-center">
                        <motion.span
                            key={confidence}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-[120px] font-black text-white tracking-tighter leading-none text-glow"
                        >
                            {confidence}
                        </motion.span>
                        <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase mt-2">Self-Perception Score</p>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={confidence}
                        onChange={(e) => setConfidence(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-white"
                    />
                    <p className="text-xs text-slate-600 text-center font-bold px-8 leading-relaxed italic uppercase tracking-widest">
                        "Thinking you are ready is the first step toward silence."
                    </p>
                </div>
            )
        },
        {
            title: "Final Truth",
            subtitle: "Acknowledge the Recall OS protocol.",
            content: (
                <div className="space-y-6 pt-6">
                    <div className="p-8 rounded-[2.5rem] glass-card space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                I understand that <span className="text-white">Recognition is not Retention.</span> I will only answer using unaided recall.
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                I will not binge-study or skip daily truth checks.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setCommitted(!committed)}
                        className="flex items-center gap-4 px-4 py-6 w-full group"
                    >
                        <div className={`w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center ${committed ? 'bg-white border-white' : 'border-white/10 bg-white/5'}`}>
                            {committed && <div className="w-3 h-3 bg-black rounded-sm" />}
                        </div>
                        <span className="text-sm font-black text-white uppercase tracking-widest text-left">Internalize Protocol</span>
                    </button>
                </div>
            )
        }
    ];

    const currentStep = steps[step - 1];

    return (
        <div className="flex flex-col min-h-screen bg-background p-8 max-w-[450px] mx-auto overflow-hidden">
            {/* Nav */}
            <header className="flex justify-between items-center mb-12 py-4">
                <div className="h-1 flex-1 bg-white/5 rounded-full mr-12 overflow-hidden">
                    <motion.div
                        initial={{ width: '33%' }}
                        animate={{ width: `${(step / steps.length) * 100}%` }}
                        className="h-full bg-white"
                    />
                </div>
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Phase {step}</span>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col pt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="space-y-2"
                    >
                        <h1 className="text-4xl font-black text-white tracking-tighter leading-tight">{currentStep.title}</h1>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{currentStep.subtitle}</p>
                        {currentStep.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="pt-10 pb-12">
                <Button
                    onClick={() => step < steps.length ? setStep(step + 1) : handleComplete()}
                    disabled={step === steps.length && !committed}
                    className="w-full h-20 bg-white text-black font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 transition-all disabled:opacity-30"
                >
                    {step === steps.length ? 'Enter Protocol' : 'Next Identity'}
                </Button>
            </div>
        </div>
    );
};

export default OnboardingFlow;
