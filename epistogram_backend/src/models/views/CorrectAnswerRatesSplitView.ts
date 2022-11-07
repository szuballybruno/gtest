import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

export class CorrectAnswerRatesSplitView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    examCorrectAnswerRate: number;

    @XViewColumn()
    practiseCorrectAnswerRate: number;

    @XViewColumn()
    videoCorrectAnswerRate: number;
}