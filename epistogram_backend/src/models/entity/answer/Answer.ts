import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<Answer>;

    // TO MANY

    // answer versions 
    @XOneToMany<Answer>()(() => AnswerVersion, x => x.answer)
    answerVersions: AnswerVersion[];
}