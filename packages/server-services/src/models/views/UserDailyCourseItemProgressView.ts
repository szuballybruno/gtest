import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserDailyCourseItemProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    completedItemCount: number;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    offsetDaysFromStart: number;

    @XViewColumn()
    isCurrent: boolean;
}