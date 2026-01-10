export type ExamType = 'SSC' | 'Banking';
export type Language = 'English' | 'Hindi';
export type ConceptStatus = 'Fresh' | 'Unstable' | 'Stable' | 'Decaying';

export interface UserProfile {
    examType: ExamType;
    attemptNumber: number;
    language: Language;
    initialConfidence: number; // 1-10
}

export interface Concept {
    id: string;
    name: string;
    category: string;
    status: ConceptStatus;
    lastRecalled: string | null;
    stabilityScore: number; // 0-1
    deceptionCount: number; // Times user lied/failed a "confident" concept
}

export interface Question {
    id: string;
    conceptId: string;
    text: string;
    correctAnswer: string;
    options?: string[];
    type: 'text' | 'numeric' | 'multiple-choice';
    framing: string; // Description of the framing (e.g., 'Direct', 'Inverse', 'Scenario')
}

export interface RecallAttempt {
    id: string;
    questionId: string;
    conceptId: string;
    isCorrect: boolean;
    timeTaken: number;
    timestamp: string;
}

export interface DailySession {
    date: string;
    completed: boolean;
    questionsCount: number;
}
