import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AnswerSessionView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: number;

    @ViewColumn()
    @XViewColumn()
    examVersionId: number;

    @ViewColumn()
    @XViewColumn()
    isSuccessful: boolean;

    @ViewColumn()
    @XViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    answeredQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    correctGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    givenAnswerCount: number;
}
