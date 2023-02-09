import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class DailyTip {

    @XViewColumn()
    id: Id<'DailyTip'>;

    @XViewColumn()
    description: string;

    @XViewColumn()
    isLive: boolean;

    @XViewColumn()
    isMax: boolean;

    @XViewColumn()
    personalityTraitCategoryId: Id<'PersonalityTraitCategory'>;

    @XViewColumn()
    videoFileId: Id<'VideoFile'> | null;
}