import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class UserDailyProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    spentSeconds: number;
}