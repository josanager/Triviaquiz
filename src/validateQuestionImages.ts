import type { Question } from './questions';

export const validateUniqueQuestionImages = (
    questions: Question[],
    label: string
): Question[] => {
    const usedImages = new Map<string, number>();

    questions.forEach((question, index) => {
        const previousIndex = usedImages.get(question.image);

        if (previousIndex !== undefined) {
            throw new Error(
                `Duplicate image detected in ${label}: question ${previousIndex + 1} and question ${
                    index + 1
                } share ${question.image}`
            );
        }

        usedImages.set(question.image, index);
    });

    return questions;
};
