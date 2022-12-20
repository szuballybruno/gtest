import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class ConstantValue {

    @XViewColumn()
    id: Id<'ConstantValue'>;

    @XViewColumn()
    key: string;

    @XViewColumn()
    value: number;
}