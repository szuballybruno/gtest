import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseAllItemsCompletedView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}