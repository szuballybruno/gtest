import { UserVideoProgressBridge } from '../models/tables/UserVideoProgressBridge';
import { VideoCompletion } from '../models/tables/VideoCompletion';
import { ModuleVersion } from '../models/tables/ModuleVersion';
import { VideoPlaybackSample } from '../models/tables/VideoPlaybackSample';
import { VideoSeekEvent } from '../models/tables/VideoSeekEvent';
import { VideoData } from '../models/tables/VideoData';
import { VideoVersion } from '../models/tables/VideoVersion';
import { VideoCursorSecondsView } from '../models/views/VideoCursorSecondsView';
import { VideoPlaybackSampleDTO } from '@episto/communication';
import { VideoSeekEventDTO } from '@episto/communication';
import { VideoSamplingResultDTO } from '@episto/communication';
import { instantiate } from '@episto/commonlogic';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '@episto/x-core';
import { AuthorizationService } from './AuthorizationService';
import { CoinAcquireService } from './CoinAcquireService';
import { CourseCompletionService } from './CourseCompletionService';
import { MapperService } from './MapperService';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService';
import { SampleMergeService } from './SampleMergeService';
import { UserSessionActivityService } from './UserSessionActivityService';

export class PlaybackService extends ServiceBase {

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService,
        private _coinAcquireService: CoinAcquireService,
        private _userSessionActivityService: UserSessionActivityService,
        private _config: GlobalConfigurationService,
        private _sampleMergeService: SampleMergeService,
        private _authorizationService: AuthorizationService,
        private _courseCompletionService: CourseCompletionService) {

        super(mapperService, ormService);
    }

    /**
     * Reciveves an incoming video playback sample.
     * - Merges the new sample with the existing ones, and saves them to the DB.
     * - Calculates the video progress.
     * - Handles video completion related stuff.
     * - Saves user activity.
     * Returns: the completion flag, and a value of maxWatchedSeconds
     */
    async saveVideoPlaybackSample(principalId: PrincipalId, dto: VideoPlaybackSampleDTO) {

        const userId = principalId.getId();

        const {
            videoPlaybackSessionId,
            videoVersionId,
            fromSeconds,
            toSeconds
        } = dto;

        // handle sample merge
        const { mergedSamples } = await this
            ._handleSampleMerge(userId, videoVersionId, videoPlaybackSessionId, fromSeconds, toSeconds);

        // handle video progress
        const { isFirstCompletion } = await this
            ._handleVideoProgressAsync(userId, videoVersionId, toSeconds, mergedSamples);

        // save user activity of video watching
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'video', videoVersionId);

        // get max watched seconds
        const maxWathcedSeconds = await this
            .getMaxWatchedSeconds(userId, videoVersionId);

        /**
         * First time completion
         */
        if (isFirstCompletion)
            await this._handleFirstTimeCompletionAsync(userId, videoVersionId);

        return instantiate<VideoSamplingResultDTO>({
            isWatchedStateChanged: isFirstCompletion,
            maxWathcedSeconds
        });
    }

    /**
     * Saves a video seek event
     */
    async saveVideoSeekEventAsync(principalId: PrincipalId, videoSeekEventDTO: VideoSeekEventDTO) {

        const userId = principalId.getId();

        const {
            fromSeconds,
            toSeconds,
            videoVersionId,
            videoPlaybackSessionId
        } = videoSeekEventDTO;

        await this._ormService
            .createAsync(VideoSeekEvent, {
                creationDate: new Date(),
                fromSeconds: fromSeconds,
                toSeconds: toSeconds,
                userId: userId,
                videoVersionId,
                videoPlaybackSessionId: videoPlaybackSessionId,
                isForward: fromSeconds <= toSeconds
            });
    }

    /**
     * Gets the max watched seconds
     * // TODO clarify this
     */
    getMaxWatchedSeconds = async (userId: Id<'User'>, videoVersionId: Id<'VideoVersion'>) => {

        const ads = await this._ormService
            .query(VideoCursorSecondsView, { userId, videoVersionId })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return ads.toSeconds;
    };

    /**
     * handleFirstTimeCompletion
     */
    private async _handleFirstTimeCompletionAsync(
        userId: Id<'User'>,
        videoVersionId: Id<'VideoVersion'>) {

        /**
         * Reward coins
         */
        const videoVersion = await this._ormService
            .query(VideoVersion, { videoVersionId })
            .where('id', '=', 'videoVersionId')
            .getSingle();

        await this._coinAcquireService
            .acquireVideoWatchedCoinsAsync(userId, videoVersion.videoId);

        /**
         * Course completion
         */
        const moduleVersion = await this._ormService
            .query(ModuleVersion, { id: videoVersion.moduleVersionId })
            .where('id', '=', 'id')
            .getSingle();

        await this
            ._courseCompletionService
            .tryFinishCourseAsync(userId, moduleVersion.courseVersionId!);
    }

    //
    // PRIVATE
    //

    private async _handleSampleMerge(
        userId: Id<'User'>,
        videoVersionId: Id<'VideoVersion'>,
        videoPlaybackSessionId: Id<'VideoPlaybackSession'>,
        fromSeconds: number,
        toSeconds: number) {

        // get old playback samples
        const oldSamples = await this
            ._getVideoPlaybackSamples(userId, videoVersionId, videoPlaybackSessionId);

        // merge samples
        const currentSample = {
            fromSeconds,
            toSeconds
        } as VideoPlaybackSample;

        const mergedSamples = this._sampleMergeService
            .mergeSamples([currentSample, ...oldSamples]);

        await this._saveMergedSamples(mergedSamples, userId, videoVersionId, videoPlaybackSessionId);

        return { mergedSamples };
    }

    private async _saveMergedSamples(
        mergedSamples: VideoPlaybackSample[],
        userId: Id<'User'>,
        videoVersionId: Id<'VideoVersion'>,
        videoPlaybackSessionId: Id<'VideoPlaybackSession'>) {

        const samplesToDelete = await this._ormService
            .query(VideoPlaybackSample, { videoVersionId, userId })
            .where('videoVersionId', '=', 'videoVersionId')
            .and('userId', '=', 'userId')
            .getMany();

        await this._ormService
            .hardDelete(VideoPlaybackSample, samplesToDelete.map(x => x.id));

        await this._ormService
            .createManyAsync(VideoPlaybackSample, mergedSamples
                .map(x => ({
                    creationDate: new Date(),
                    fromSeconds: x.fromSeconds,
                    toSeconds: x.toSeconds,
                    userId,
                    videoVersionId,
                    videoPlaybackSessionId
                } as VideoPlaybackSample)));
    }

    private async _handleVideoProgressAsync(userId: Id<'User'>, videoVersionId: Id<'VideoVersion'>, toSeconds: number, mergedSamples: VideoPlaybackSample[]) {

        // calucate watched percent
        const watchedPercent = await this
            ._getVideoWatchedPercentAsync(videoVersionId, mergedSamples);

        const isCompleted = watchedPercent > this._config.misc.videoCompletedPercentage;
        const isCompletedBefore = await this._getVideoIsCompletedStateAsync(userId, videoVersionId);
        const isFirstCompletion = isCompleted && !isCompletedBefore;
        const completionDate = isFirstCompletion ? new Date() : undefined;

        // save user video progress bridge
        await this
            ._saveUserVideoProgressBridgeAsync(userId, videoVersionId, watchedPercent, toSeconds, completionDate);

        return { isFirstCompletion };
    }

    private async _getVideoWatchedPercentAsync(videoVersionId: Id<'VideoVersion'>, samples: VideoPlaybackSample[]) {

        if (samples.length === 0)
            return 0;

        const { videoFileLengthSeconds } = await this._ormService
            .withResType<VideoData>()
            .query(VideoVersion, { videoVersionId })
            .selectFrom(x => x
                .columns(VideoData, {
                    videoFileLengthSeconds: 'videoFileLengthSeconds'
                }))
            .leftJoin(VideoData, x => x
                .on('id', '=', 'videoDataId', VideoVersion))
            .where('id', '=', 'videoVersionId')
            .getSingle();

        if (!videoFileLengthSeconds)
            return 0;

        const netWatchedSeconds = samples
            .map(x => x.toSeconds - x.fromSeconds)
            .reduce((prev, curr) => curr + prev);

        return Math.round((netWatchedSeconds / videoFileLengthSeconds) * 100);
    }

    private async _getVideoPlaybackSamples(
        userId: Id<'User'>,
        videoVersionId: Id<'VideoVersion'>,
        videoPlaybackSessionId: Id<'VideoPlaybackSession'>) {

        return this._ormService
            .query(VideoPlaybackSample, { userId, videoVersionId, videoPlaybackSessionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .and('userId', '=', 'userId')
            .and('videoPlaybackSessionId', '=', 'videoPlaybackSessionId')
            .getMany();
    }

    private async _saveUserVideoProgressBridgeAsync(
        userId: Id<'User'>,
        videoVersionId: Id<'VideoVersion'>,
        completedPercentage: number,
        cursorSeconds: number,
        newCompletionDate?: Date) {

        const pbd = await this._ormService
            .query(UserVideoProgressBridge, { videoVersionId, userId })
            .where('videoVersionId', '=', 'videoVersionId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        await this._ormService
            .saveOrInsertAsync(UserVideoProgressBridge, {
                id: pbd?.id,
                userId,
                videoVersionId,
                completedPercentage,
                cursorSeconds
            });

        /**
         * If completed, insert new completion entity
         */
        if (newCompletionDate)
            await this._ormService
                .createAsync(VideoCompletion, {
                    completionDate: new Date(),
                    videoVersionId,
                    userId
                });
    }

    private async _getVideoIsCompletedStateAsync(
        userId: Id<'User'>,
        videoVersionId: Id<'VideoVersion'>) {

        const courseItemCompletion = await this
            ._ormService
            .query(VideoCompletion, { userId, videoVersionId })
            .where('videoVersionId', '=', 'videoVersionId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        return !!courseItemCompletion;
    }
}
