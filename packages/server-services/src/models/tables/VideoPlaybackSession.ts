import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class VideoPlaybackSession {

    @XViewColumn()
    id: Id<'VideoPlaybackSession'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    lastUsageDate: Date;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}