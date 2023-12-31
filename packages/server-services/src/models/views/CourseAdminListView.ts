import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseAdminListView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    userCountCompleted: number;

    @XViewColumn()
    userCountCurrent: number;

    @XViewColumn()
    userCountAll: number;

    @XViewColumn()
    userCountAllPrev: number;

    @XViewColumn()
    userCountAllChange: number;
}