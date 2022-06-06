import { useEffect, useState } from 'react';
import { PlaybackApiService } from '../../../services/api/playbackApiService';
import { Environment } from '../../../static/Environemnt';
import { isBetweenThreshold } from '../../../static/frontendHelpers';

export const usePlaybackWatcher = (
    playedSeconds: number,
    isPlaying: boolean,
    onVideoWatchedStateChanged: () => void,
    setMaxWatchedSeconds: (maxWatchedSeconds: number) => void,
    isSamplingEnabled: boolean,
    videoItemCode: string,
    videoPlaybackSessionId: number) => {

    // the rate in which new samples are taken
    const sampleRateSeconds = 5;

    // the maximum time that can pass between samples 
    // while the samples would still be considered valid 
    const maxSampleSeconds = sampleRateSeconds + (sampleRateSeconds / 2);

    // the minimum seconds that count as a valid sample
    const minSampleSeconds = 1;

    // the collection of taken samples
    const [lastSampleSeconds, setLastSampleSeconds] = useState(0);

    // post funciton
    const { postVideoPlaybackSample, videoSamplingResult } = PlaybackApiService.usePostVideoPlaybackSample();

    const samplePlayedSeconds = () => {

        if (!isSamplingEnabled)
            return;

        setLastSampleSeconds(playedSeconds);

        const elapsedSeconds = Math.round((playedSeconds - lastSampleSeconds) * 10) / 10;

        if (elapsedSeconds < maxSampleSeconds
            && elapsedSeconds > 0
            && elapsedSeconds > minSampleSeconds) {

            if (Environment.verboseLogging)
                console.log(`Watched ${elapsedSeconds}s`);

            postVideoPlaybackSample({
                fromSeconds: lastSampleSeconds,
                toSeconds: playedSeconds,
                videoItemCode,
                videoPlaybackSessionId
            });
        }
    };

    // force sample at playback changes
    useEffect(() => {

        samplePlayedSeconds();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    // sample
    useEffect(() => {

        // ordinary sample 
        if (isBetweenThreshold(playedSeconds, lastSampleSeconds, sampleRateSeconds))
            return;

        samplePlayedSeconds();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playedSeconds]);

    // watched state changed 
    useEffect(
        () => {

            if (videoSamplingResult?.isWatchedStateChanged)
                onVideoWatchedStateChanged();

            if (videoSamplingResult?.maxWathcedSeconds)
                setMaxWatchedSeconds(videoSamplingResult.maxWathcedSeconds);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [videoSamplingResult?.isWatchedStateChanged, videoSamplingResult?.maxWathcedSeconds]);
};