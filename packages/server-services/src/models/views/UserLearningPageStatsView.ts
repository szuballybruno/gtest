import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserLearningPageStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    userEmail: string;

    @XViewColumn()
    videosToBeRepeatedCount: number;

    @XViewColumn()
    questionsToBeRepeatedCount: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    totalSessionLengthSeconds: number;

    @XViewColumn()
    answeredQuestionsCount: number;

    @XViewColumn()
    totalCorrectAnswerRate: number;

    @XViewColumn()
    rankInsideCompany: number;
}