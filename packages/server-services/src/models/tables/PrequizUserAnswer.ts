import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class PrequizUserAnswer {

    @XViewColumn()
    id: Id<'PrequizUserAnswer'>;

    @XViewColumn()
    value: number | null;

    @XViewColumn()
    questionId: Id<'PrequizQuestion'>;

    @XViewColumn()
    answerId: Id<'PrequizAnswer'> | null;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}