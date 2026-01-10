import type { Question, Concept } from '../types';

export const SAMPLE_CONCEPTS: Concept[] = [
    { id: 'c1', name: 'Time & Work', category: 'Arithmetic', status: 'Fresh', lastRecalled: null, stabilityScore: 0, deceptionCount: 0 },
    { id: 'c2', name: 'Syllogism', category: 'Reasoning', status: 'Fresh', lastRecalled: null, stabilityScore: 0, deceptionCount: 0 },
    { id: 'c3', name: 'Percentage', category: 'Arithmetic', status: 'Fresh', lastRecalled: null, stabilityScore: 0, deceptionCount: 0 },
    { id: 'c4', name: 'Blood Relations', category: 'Reasoning', status: 'Fresh', lastRecalled: null, stabilityScore: 0, deceptionCount: 0 },
    { id: 'c5', name: 'English Grammar', category: 'English', status: 'Fresh', lastRecalled: null, stabilityScore: 0, deceptionCount: 0 },
];

export const SAMPLE_QUESTIONS: Question[] = [
    // Time & Work Variants
    {
        id: 'q1_1',
        conceptId: 'c1',
        text: 'A can do a piece of work in 10 days and B can do it in 15 days. Working together, how many days will they take?',
        correctAnswer: '6',
        type: 'numeric',
        framing: 'Direct'
    },
    {
        id: 'q1_2',
        conceptId: 'c1',
        text: 'A and B together can do a piece of work in 6 days. If A alone takes 10 days, how many days will B take alone?',
        correctAnswer: '15',
        type: 'numeric',
        framing: 'Inverse'
    },
    // Syllogism Variants
    {
        id: 'q2_1',
        conceptId: 'c2',
        text: 'All Mammals are Animals. All Animals are Living Beings. Therefore, All Mammals are Living Beings. Valid?',
        correctAnswer: 'Yes',
        type: 'text',
        framing: 'Direct'
    },
    {
        id: 'q2_2',
        conceptId: 'c2',
        text: 'No Birds are Mammals. Some Mammals are Animals. Conclusion: Some Animals are not Birds. Valid?',
        correctAnswer: 'Yes',
        type: 'text',
        framing: 'Direct'
    },
    // Percentage Variants
    {
        id: 'q3_1',
        conceptId: 'c3',
        text: 'What is 20% of 40% of 500?',
        correctAnswer: '40',
        type: 'numeric',
        framing: 'Direct'
    },
    {
        id: 'q3_2',
        conceptId: 'c3',
        text: 'If 40 is 20% of X% of 500, what is X?',
        correctAnswer: '40',
        type: 'numeric',
        framing: 'Inverse'
    },
    // Blood Relations
    {
        id: 'q4_1',
        conceptId: 'c4',
        text: 'Pointing to a portrait of a man, Ravish said, "His mother is the only daughter of my mother\'s son." Whose portrait?',
        correctAnswer: 'His daughter',
        type: 'text',
        framing: 'Scenario'
    },
    // English Grammar
    {
        id: 'q5_1',
        conceptId: 'c5',
        text: 'Identify the tense: "I have been reading this book since morning."',
        correctAnswer: 'Present Perfect Continuous',
        type: 'text',
        framing: 'Identification'
    },
    {
        id: 'q5_2',
        conceptId: 'c5',
        text: 'Convert "He goes to school" into Present Perfect tense.',
        correctAnswer: 'He has gone to school',
        type: 'text',
        framing: 'Transformation'
    }
];
