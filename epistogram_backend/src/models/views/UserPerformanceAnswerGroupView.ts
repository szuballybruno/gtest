import { ViewColumn, ViewEntity } from '../MyORM';
import { Id } from '../../shared/types/versionId';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPerformanceAnswerGroupView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    @ViewColumn()
    examCorrectAnswerRate: number;

    @XViewColumn()
    @ViewColumn()
    practiseCorrectAnswerRate: number;

    @XViewColumn()
    @ViewColumn()
    videoCorrectAnswerRate: number;
}