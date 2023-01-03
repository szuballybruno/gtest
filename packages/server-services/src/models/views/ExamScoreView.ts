import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class ExamScoreView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    questionCount: number;

    @XViewColumn()
    examScore: number;

    @XViewColumn()
    examMaxScore: number;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    scorePercentage: number;
}