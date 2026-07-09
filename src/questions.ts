import { songBank } from './questionBank';

export interface Question {
    title: string;
    image: string;
    audioUrl: string;
    audioFile: string;
    previewStartSeconds: number;
    artist: string;
}

export const questions: Question[] = songBank;

export const verticalQuestions: Question[] = questions.slice(-5);
