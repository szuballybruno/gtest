import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';

export class CourseStateView {

    @XViewColumn()
    courseId: Id<'Course'>;
    @XViewColumn()
    userId: Id<'User'>;
    @XViewColumn()
    isCurrent: boolean;
    @XViewColumn()
    inProgress: boolean;
    @XViewColumn()
    isCompleted: boolean;
}