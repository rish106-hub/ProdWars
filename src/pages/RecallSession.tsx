import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { SAMPLE_QUESTIONS } from '@/data/questions';
import type { Question } from '@/types';

const RecallSession = () => {
    const navigate = useNavigate();
    const { addAttempt, completeSession, sessions } = useApp();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [startTime, setStartTime] = useState(Date.now());
    const [showProtocolReminder, setShowProtocolReminder] = useState(true);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);

    useEffect(() => {
        // Framing Variance Logic:
        // 1. Group all available questions by concept
        const conceptGroups: Record<string, Question[]> = {};
        SAMPLE_QUESTIONS.forEach(q => {
            if (!conceptGroups[q.conceptId]) conceptGroups[q.conceptId] = [];
            conceptGroups[q.conceptId].push(q);
        });

        // 2. Select 5 random concepts
        const conceptIds = Object.keys(conceptGroups).sort(() => 0.5 - Math.random()).slice(0, 5);

        // 3. For each selected concept, pick ONE random framing variant
        const selectedQuestions = conceptIds.map(cid => {
            const variants = conceptGroups[cid];
            return variants[Math.floor(Math.random() * variants.length)];
        });

        setQuestions(selectedQuestions);
        setStartTime(Date.now());
    }, []);

    const processNext = () => {
        setIsFeedbackVisible(false);
        setLastResult(null);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setAnswer('');
            setStartTime(Date.now());
        } else {
            completeSession(questions.length);
            navigate('/day-result');
        }
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!answer.trim() || isFeedbackVisible) return;

        const currentQuestion = questions[currentIndex];
        const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();

        setLastResult(isCorrect ? 'correct' : 'wrong');
        setIsFeedbackVisible(true);

        addAttempt({
            id: Math.random().toString(36).substr(2, 9),
            questionId: currentQuestion.id,
            conceptId: currentQuestion.conceptId,
            isCorrect,
            timeTaken: (Date.now() - startTime) / 1000,
            timestamp: new Date().toISOString()
        });

        // Visceral delay for feedback
        setTimeout(processNext, isCorrect ? 800 : 1500);
    };

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];
    const dayCount = sessions.length + 1;

    return (
        <div className="flex flex-col min-h-screen p-6 max-w-[450px] mx-auto overflow-hidden">
            <header className="flex justify-between items-center mb-12 pt-4">
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white tracking-tighter">Recall</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Day {dayCount}</span>
                </div>
                <div className="flex gap-2">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i < currentIndex ? 'bg-green-500/50' : i === currentIndex ? 'bg-white w-8' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </header>

            <AnimatePresence mode="wait">
                {showProtocolReminder ? (
                    <motion.div
                        key="reminder"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col justify-center items-center text-center space-y-12"
                    >
                        <div className="p-8 rounded-[2.5rem] glass-card space-y-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h2 className="text-3xl font-black text-white tracking-tight">Truth Protocol</h2>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Put away your notes.<br />
                                No skipping. No checking.<br />
                                <span className="text-white mt-4 block">Only what's in your head is real.</span>
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowProtocolReminder(false)}
                            className="w-full h-16 bg-white text-black font-black text-xl rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
                        >
                            I Understand
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col pt-4"
                    >
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                        Reality Check {currentIndex + 1} / {questions.length}
                                    </span>
                                    <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-indigo-500/20">
                                        {currentQuestion.framing}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold leading-tight text-white tracking-tight">
                                    {currentQuestion.text}
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="relative">
                                <Input
                                    autoFocus
                                    placeholder="Type answer here..."
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    disabled={isFeedbackVisible}
                                    className={`h-20 text-xl font-bold bg-white/5 border-2 rounded-2xl px-6 transition-all duration-300 ${lastResult === 'correct' ? 'border-green-500 bg-green-500/10' :
                                        lastResult === 'wrong' ? 'border-red-500 bg-red-500/10 animate-shake' :
                                            'border-white/5 focus:border-white/20'
                                        } text-white`}
                                />
                                {isFeedbackVisible && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 font-black uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-full ${lastResult === 'correct' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}
                                    >
                                        {lastResult === 'correct' ? 'Target Hit' : 'Recall Failed'}
                                    </motion.div>
                                )}
                            </form>
                        </div>

                        <div className="pt-8 pb-12">
                            <Button
                                onClick={() => handleSubmit()}
                                disabled={!answer.trim() || isFeedbackVisible}
                                className={`w-full h-16 text-lg font-black rounded-2xl transition-all ${isFeedbackVisible ? 'opacity-0 scale-95' : 'bg-white text-black shadow-xl active:scale-95'
                                    }`}
                            >
                                Verify Truth
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RecallSession;
