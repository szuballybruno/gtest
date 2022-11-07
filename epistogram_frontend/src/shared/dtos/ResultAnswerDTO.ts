import { Id } from '../types/versionId';

export type ResultAnswerDTO = {
    answerId: Id<'Answer'>,
    answerText: string;
    isCorrect: boolean;
    isGiven: boolean;
}