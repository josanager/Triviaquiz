import { songBankEn } from './questionBank';
import { Question } from './questions';

export const questionsEn: Question[] = songBankEn;

export const verticalQuestions: Question[] = questionsEn.slice(-5);
