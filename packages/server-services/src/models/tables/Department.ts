import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Department {

    @XViewColumn()
    id: Id<'Department'>;

    @XViewColumn()
    name: string;
}