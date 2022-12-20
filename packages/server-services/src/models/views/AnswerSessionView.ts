import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class AnswerSessionView {

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    answerSessionAcquiredPoints: number;

    @XViewColumn()
    answerSessionSuccessRate: number;

    @XViewColumn()
    isSuccessful: boolean;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    correctGivenAnswerCount: number;

    @XViewColumn()
    givenAnswerCount: number;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    endDate: Date;

    @XViewColumn()
    answerSessionType: string;
}