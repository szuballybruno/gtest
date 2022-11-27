import { DeletionDateColumn, IsDeletedColumn, XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class CompanyAssociatedCoursesView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    @IsDeletedColumn()
    isDeleted: boolean;

    @XViewColumn()
    isAssigned: boolean;

    @XViewColumn()
    isDefault: boolean;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    title: string;
}