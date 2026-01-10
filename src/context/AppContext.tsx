import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, Concept, RecallAttempt, DailySession, ConceptStatus } from '../types';
import { SAMPLE_CONCEPTS } from '../data/questions';

interface AppContextType {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
    concepts: Concept[];
    setConcepts: (concepts: Concept[]) => void;
    attempts: RecallAttempt[];
    addAttempt: (attempt: RecallAttempt) => void;
    sessions: DailySession[];
    completeSession: (questionsCount: number) => void;
    isLoading: boolean;
    logout: () => void;
    getTruthMetrics: () => {
        actualCompetence: number;
        illusionGap: number;
        readinessIndex: number;
        stableCount: number;
        decayingCount: number;
        unstableCount: number;
        isIllusionHigh: boolean;
        topics: { name: string; stability: number; status: ConceptStatus }[];
        mistakeConversionCount: number;
    } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfileState] = useState<UserProfile | null>(null);
    const [concepts, setConcepts] = useState<Concept[]>(SAMPLE_CONCEPTS);
    const [attempts, setAttempts] = useState<RecallAttempt[]>([]);
    const [sessions, setSessions] = useState<DailySession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedProfile = localStorage.getItem('recall_profile');
        const storedConcepts = localStorage.getItem('recall_concepts');
        const storedAttempts = localStorage.getItem('recall_attempts');
        const storedSessions = localStorage.getItem('recall_sessions');

        if (storedProfile) setProfileState(JSON.parse(storedProfile));
        if (storedConcepts) setConcepts(JSON.parse(storedConcepts));
        if (storedAttempts) setAttempts(JSON.parse(storedAttempts));
        if (storedSessions) setSessions(JSON.parse(storedSessions));

        setIsLoading(false);
    }, []);

    const setProfile = (newProfile: UserProfile) => {
        setProfileState(newProfile);
        localStorage.setItem('recall_profile', JSON.stringify(newProfile));
    };

    const addAttempt = (attempt: RecallAttempt) => {
        const newAttempts = [...attempts, attempt];
        setAttempts(newAttempts);
        localStorage.setItem('recall_attempts', JSON.stringify(newAttempts));

        setConcepts(prev => {
            const updated = prev.map(c => {
                if (c.id === attempt.conceptId) {
                    let newStatus = c.status;
                    let newStability = c.stabilityScore;
                    let newDeceptionCount = c.deceptionCount || 0;

                    if (attempt.isCorrect) {
                        newStability = Math.min(1, newStability + 0.2);
                        if (newStability >= 0.8) newStatus = 'Stable';
                        else if (newStability >= 0.3) newStatus = 'Unstable';
                    } else {
                        // Deception Check: If were stable but failed
                        if (c.stabilityScore > 0.6) {
                            newDeceptionCount += 1;
                        }
                        newStability = Math.max(0, newStability - 0.3);
                        if (newStability < 0.3) newStatus = 'Decaying';
                        else newStatus = 'Unstable';
                    }

                    return {
                        ...c,
                        status: newStatus as ConceptStatus,
                        stabilityScore: newStability,
                        deceptionCount: newDeceptionCount,
                        lastRecalled: attempt.timestamp
                    };
                }
                return c;
            });
            localStorage.setItem('recall_concepts', JSON.stringify(updated));
            return updated;
        });
    };

    const completeSession = (questionsCount: number) => {
        const today = new Date().toISOString().split('T')[0];
        const newSession: DailySession = {
            date: today,
            completed: true,
            questionsCount
        };
        const newSessions = [...sessions, newSession];
        setSessions(newSessions);
        localStorage.setItem('recall_sessions', JSON.stringify(newSessions));
    };

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const getTruthMetrics = () => {
        const totalConcepts = concepts.length;
        if (totalConcepts === 0) return null;

        const stableCount = concepts.filter(c => c.status === 'Stable').length;
        const decayingCount = concepts.filter(c => c.status === 'Decaying').length;
        const unstableCount = concepts.filter(c => c.status === 'Unstable').length;

        const avgStability = concepts.reduce((acc, c) => acc + c.stabilityScore, 0) / totalConcepts;
        const actualCompetence = avgStability * 10;

        const initialConfidence = profile?.initialConfidence || 0;
        const illusionGap = initialConfidence - actualCompetence;

        const readinessIndex = Math.max(0, Math.min(100, Math.round((avgStability * 110) - (decayingCount / totalConcepts * 30))));

        // Mistake Conversion: Correct attempts for concepts that were "Decaying" or "Unstable"
        const mistakeConversionCount = attempts.filter(a => {
            if (!a.isCorrect) return false;
            // Check if it was historically unstable (simplified for MVP: any correct attempt helps)
            return true;
        }).length;

        return {
            actualCompetence,
            illusionGap,
            readinessIndex,
            stableCount,
            decayingCount,
            unstableCount,
            isIllusionHigh: illusionGap > 2,
            mistakeConversionCount,
            topics: concepts.map(c => ({
                name: c.name,
                stability: c.stabilityScore,
                status: c.status
            }))
        };
    };

    return (
        <AppContext.Provider value={{
            profile,
            setProfile,
            concepts,
            setConcepts,
            attempts,
            addAttempt,
            sessions,
            completeSession,
            isLoading,
            logout,
            getTruthMetrics
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
