import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserCourseCompletionCurrentView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    previsionedItemsPerDay: number;

    @XViewColumn()
    previsionedCompletionDate: Date;

    @XViewColumn()
    previsionedLengthDays: number;

    @XViewColumn()
    requiredLengthDays: number;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    requiredRemainingDays: number;

    @XViewColumn()
    requiredItemsPerDay: number;

    @XViewColumn()
    requiredItemsCompletedByNow: number;

    @XViewColumn()
    requiredPercentCompletedByNow: number;

    @XViewColumn()
    startDate: Date;
}