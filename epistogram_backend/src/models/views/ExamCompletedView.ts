import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class ExamCompletedView {

	@ViewColumn()
	@XViewColumn()
	userId: Id<'User'>;

	@ViewColumn()
	@XViewColumn()
	examId: Id<'Exam'>;

	@ViewColumn()
	@XViewColumn()
	courseId: Id<'Course'>;

	@ViewColumn()
	@XViewColumn()
	isFinalExam: number;

	@ViewColumn()
	@XViewColumn()
	orderIndex: number;

	@ViewColumn()
	@XViewColumn()
	successfulSessionCount: boolean;

	@ViewColumn()
	@XViewColumn()
	hasSuccessfulSession: boolean;

	@ViewColumn()
	@XViewColumn()
	singleSuccessfulSession: boolean;
}