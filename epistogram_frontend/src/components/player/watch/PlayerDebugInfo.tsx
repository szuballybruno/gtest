import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { useVideoPlayerFullscreenContext } from './videoPlayer/VideoPlayerFullscreenFrame';
import { VideoPlayerStateType } from './videoPlayer/videoPlayerState';
export const PlayerDebugInfo = (props: {
    videoPlayerState: VideoPlayerStateType,
    videoTitle: string
}) => {

    const { videoPlayerState, videoTitle } = props;

    const [isFullscreen] = useVideoPlayerFullscreenContext();

    const {
        isIPhone,
        isMuted,
        isLandscape,
        isPlaying,
        isSeeking,
        isShowingOverlay,
        playedSeconds,
        controlsVisible,
        isMobile,
        showMobilePlayButtonOverlay,
        showShouldRotatePhoneOverlay,
        videoLength
    } = videoPlayerState;

    return <EpistoFlex2
        position='fixed'
        top='0'
        left='0'
        color='red'
        fontWeight='bold'
        background='#FFFFFF33'
        maxWidth='40%'
        zIndex={31}>

        {'isFullscreen: ' + isFullscreen}<br />
        {'isIPhone: ' + isIPhone}<br />
        {'isMuted: ' + isMuted}<br />
        {'isLandscape: ' + isLandscape}<br />
        {'isPlaying: ' + isPlaying}<br />
        {'isSeeking: ' + isSeeking}<br />
        {'isShowingOverlay: ' + isShowingOverlay}<br />
        {'showMobilePlayButtonOverlay: ' + showMobilePlayButtonOverlay}<br />
        {'showShouldRotatePhoneOverlay: ' + showShouldRotatePhoneOverlay}<br />
        {'playedSeconds: ' + playedSeconds}<br />
        {'controlsVisible: ' + controlsVisible}<br />
        {'isMobile: ' + isMobile}<br />
        {'videoLength: ' + videoLength}<br />
        {'videoTitle: ' + videoTitle}<br />
    </EpistoFlex2>;
};