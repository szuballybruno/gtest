import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserSpentTimeRatioView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalExamSessionElapsedTime: number;

    @XViewColumn()
    totalVideoWatchElapsedTime: number;

    @XViewColumn()
    totalQuestionElapsedTime: number;

    @XViewColumn()
    otherTotalSpentSeconds: number;
}