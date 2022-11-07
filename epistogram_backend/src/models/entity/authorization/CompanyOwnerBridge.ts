import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../misc/Company';
import { User } from '../misc/User';

@Entity()
export class CompanyOwnerBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CompanyOwnerBridge'>;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @ManyToOne(_ => User, x => x.companyOwnerBridges)
    @JoinColumn(getJoinColumnName(CompanyOwnerBridge, 'userId'))
    user: Relation<User>;

    // company 
    @Column()
    @XViewColumn()
    companyId: Id<'Company'>;
    @ManyToOne(_ => Company, x => x.companyOwnerBridges)
    @JoinColumn(getJoinColumnName(CompanyOwnerBridge, 'companyId'))
    company: Relation<Company>;
}