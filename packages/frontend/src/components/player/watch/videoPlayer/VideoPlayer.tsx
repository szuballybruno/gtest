import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PropsWithChildren } from '../../../../static/frontendHelpers';
import { EpistoDiv } from '../../../controls/EpistoDiv';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { AbsoluteFlexOverlay } from '../AbsoluteFlexOverlay';
import { ShouldRotatePhoneOverlay } from '../ShouldRotatePhoneOverlay';
import { MobilePlayButtonOverlay } from './MobilePlayButtonOverlay';
import { VideoControls } from './VideoPlayerControls';
import { useVideoPlayerFullscreenContext } from './VideoPlayerFullscreenFrame';
import { VideoPlayerStateType } from './videoPlayerState';
import { videoPlayerStyles } from './videoPlayerStyles';

export const VideoPlayer = ({
    videoPlayerState,
    children,
    isVideoReady
}: {
    videoPlayerState: VideoPlayerStateType,
    isVideoReady: boolean
} & PropsWithChildren) => {

    const {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        videoUrl,
        controlsVisible,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isPlaying,
        maxWatchedSeconds,
        volume,
        isMuted,
        isMobile,
        isIPhone,
        showMobilePlayButtonOverlay,
        showShouldRotatePhoneOverlay,
        setShowShouldRotatePhoneOverlay,
        showControlOverlay,
        setPlayedSeconds,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded,
        disableFullscreenMode,
        toggleIsPlaying,
        setVolume,
        setIsMuted,
        onReady
    } = videoPlayerState;

    const [isFullscreen] = useVideoPlayerFullscreenContext();

    /* styles */
    const {
        fullScreenRootPropsDesktop,
        fullScreenRootPropsMobile,
        videoWrapperPropsDesktop,
        videoWrapperPropsMobile,
        videoPlayerControlIconStyle
    } = videoPlayerStyles;

    const fullScreenRootProps = isFullscreen
        ? fullScreenRootPropsMobile
        : fullScreenRootPropsDesktop;

    const videoWrapperProps = isFullscreen
        ? videoWrapperPropsMobile
        : videoWrapperPropsDesktop;

    const marks = [maxWatchedSeconds];

    return (
        <EpistoDiv
            id="fullScreenRoot"
            width='100%'
            ref={playerContainerRef}
            className="largeSoftShadow roundBorders"
            {...fullScreenRootProps}>

            {/* player debug info */}
            {/* <PlayerDebugInfo
                videoPlayerState={videoPlayerState}
                videoTitle={''} /> */}

            {/* MOBILE ONLY: warning to rotate the mobile, the video
                should only starts in landscape */}
            {showShouldRotatePhoneOverlay && <ShouldRotatePhoneOverlay
                onExitFullScreen={disableFullscreenMode} />}

            {/* MOBILE ONLY: overlay on top of player,
                since we don't want the user to watch video
                in portrait */}
            {showMobilePlayButtonOverlay && <MobilePlayButtonOverlay
                videoPlayerState={videoPlayerState} />}

            {/* playback */}
            <EpistoDiv
                className='whall roundBorders'
                id="playbackWrapper"
                filter={isShowingOverlay ? 'blur(4px)' : 'blur(0px)'}
                transition="0.3s"
                position="relative"
                zIndex={12}>

                {/* video wrapper */}
                <EpistoDiv
                    className='roundBorders'
                    id="videoWrapper"
                    maxHeight={(!isMobile && !isFullscreen) ? 'calc(100vh - 200px)' : undefined}
                    onClick={() => {
                        if (!isMobile) {
                            toggleIsPlaying();
                        }
                    }}
                    onMouseMove={() => showControlOverlay(true)}
                    {...videoWrapperProps}>

                    {/* the player */}
                    <EpistoReactPlayer
                        playbackRate={1}
                        playerRef={playerRef}
                        url={isVideoReady ? videoUrl : undefined}
                        style={{
                            borderRadius: 7,
                            overflow: 'hidden',
                            aspectRatio: !isMobile ? '16 / 9' : undefined,
                            maxHeight: (!isMobile && !isFullscreen) ? 'calc(100vh - 200px)' : undefined
                        }}
                        width="100%"
                        height="100%"
                        playsinline
                        volume={volume}
                        muted={isMuted}
                        controls={false}
                        playing={isPlaying}
                        onProgress={(playedInfo) => {

                            setPlayedSeconds(playedInfo.playedSeconds);
                        }}
                        onReady={onReady}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: 'true',
                                    onContextMenu: e => e.preventDefault()
                                },
                                // tracks: subtileTracks,
                            }
                        }}
                        loop={false}
                        onEnded={handleOnVideoEnded} />
                </EpistoDiv>

                {/* video controls */}
                {isVideoReady && <VideoControls
                    isFullscreen={isFullscreen}
                    controlsVisible={controlsVisible}
                    isPlaying={isPlaying}
                    markSeconds={marks}
                    playedSeconds={playedSeconds}
                    videoLength={videoLength}
                    volume={volume}
                    isMuted={isMuted}
                    isMobile={isMobile}
                    isIPhone={isIPhone}
                    setIsMuted={setIsMuted}
                    showControlOverlay={showControlOverlay}
                    seekToSeconds={seekToSeconds}
                    setIsSeeking={setIsSeeking}
                    toggleFullScreen={toggleFullScreen}
                    toggleIsPlaying={toggleIsPlaying}
                    setVolume={setVolume} />}

            </EpistoDiv>

            {/* visual overlay */}
            <AbsoluteFlexOverlay isVisible={isVisualOverlayVisible}>
                {visualOverlayType === 'pause' && <PauseIcon style={videoPlayerControlIconStyle} />}
                {visualOverlayType === 'start' && <PlayArrowIcon style={videoPlayerControlIconStyle} />}
                {visualOverlayType === 'seekRight' && <FastForwardIcon style={videoPlayerControlIconStyle} />}
                {visualOverlayType === 'seekLeft' && <FastRewindIcon style={videoPlayerControlIconStyle} />}
            </AbsoluteFlexOverlay>

            {children}
        </EpistoDiv>
    );
};
