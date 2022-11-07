import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class ExamResultStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    fullyCorrectlyAnsweredQuestionsCount: number;

    @XViewColumn()
    questionCount: number;

    @XViewColumn()
    avgScorePercentage: number;

    @XViewColumn()
    scorePercentage: number;

    @XViewColumn()
    examMaxScore: number;

    @XViewColumn()
    examScore: number;

    @XViewColumn()
    scorePercentageDiffFromAvg: number;

    @XViewColumn()
    examLengthSeconds: number;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    isHighestScoreSession: boolean;
}