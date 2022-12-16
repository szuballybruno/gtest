import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseCategory {

    @XViewColumn()
    id: Id<'CourseCategory'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    parentCategoryId: Id<'CourseCategory'> | null;
}