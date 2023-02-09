import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ExamResultView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    isCorrect: boolean;

    @XViewColumn()
    givenAnswerState: string;

    @XViewColumn()
    questionScore: number;

    @XViewColumn()
    isFinalExam: boolean;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    questionMaxScore: number;

    @XViewColumn()
    isCompletedSession: boolean;

    @XViewColumn()
    isSuccessfulSession: boolean;

    @XViewColumn()
    onlySuccessfulSession: boolean;

    @XViewColumn()
    answerBridgeId: Id<'AnswerBridge'>;

    @XViewColumn()
    userAnswerVersionId: Id<'UserAnswerVersion'>;

    @XViewColumn()
    isGivenAnswer: boolean;

    @XViewColumn()
    isAnswerCorrect: boolean;

    @XViewColumn()
    answerText: string;

    @XViewColumn()
    answerId: Id<'Answer'>;
}