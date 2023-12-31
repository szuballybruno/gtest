import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CompletedCourseExamCountView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    completedExamCount: number;
}