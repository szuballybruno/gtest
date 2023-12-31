import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ExamHighestScoreAnswerSessionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    examScore: number;

    @XViewColumn()
    isHighestScore: boolean;
}