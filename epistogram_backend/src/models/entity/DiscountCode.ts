import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { ShopItem } from './ShopItem';
import { User } from './User';

@Entity()
export class DiscountCode {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    code: string;

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    userId: number | null;
    @ManyToOne(_ => User, x => x.discountCodes)
    @JoinColumn({ name: 'user_id' })
    user: User | null;

    // shop item
    @Column()
    @XViewColumn()
    shopItemId: number;
    @OneToMany(_ => ShopItem, x => x.discountCodes)
    @JoinColumn({ name: 'shop_item_id' })
    shopItem: Relation<ShopItem>;
}