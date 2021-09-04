import { Box } from "@chakra-ui/react";
import { Slider, Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ClosedCaption, Fullscreen, Pause, PlayArrow } from "@material-ui/icons";
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { ReactNode, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { TrackProps } from "react-player/file";
import useEventListener from 'react-use-event-listener';
import screenfull from "screenfull";
import { secondsToTime } from "../../frontendHelpers";
import { SubtitleDTO } from "../../models/shared_models/SubtitleDTO";
import { VideoDTO } from "../../models/shared_models/VideoDTO";
import { AbsoluteFlexOverlay } from "./AbsoluteFlexOverlay";
import classes from "./player.module.scss";

type VisualOverlayType = "counter" | "pause" | "start" | "seekRight" | "seekLeft";

export const useVideoPlayerState = (videoItem: VideoDTO, isShowingOverlay: boolean) => {

    const { url: videoUrl } = videoItem;
    const { subtitles } = { subtitles: [] as SubtitleDTO[] };
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const [controlOverlayTimer, setControlOverlayTimer] = useState<NodeJS.Timeout | null>(null);
    const [visualOverlayType, setVisualOverlayType] = useState<VisualOverlayType>("start");
    const [isVisualOverlayVisible, setIsVisualOverlayVisible] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const controlsOpacity = showControls || !isPlaying || isSeeking ? 1 : 0;

    const subtileTracks = subtitles
        .map(x => ({

        } as TrackProps))

    const toggleFullScreen = () => {

        // @ts-ignore
        screenfull.toggle(playerContainerRef.current);
    };

    const seekToSeconds = (seconds: number) => {

        // @ts-ignore
        playerRef.current.seekTo(seconds as number)
    }

    const flashVisualOverlay = (visualOverlayType: VisualOverlayType) => {

        setIsVisualOverlayVisible(true);
        setVisualOverlayType(visualOverlayType);

        setTimeout(() => {

            setIsVisualOverlayVisible(false);
        }, 200);
    }

    const showControlOverlay = (indefinate?: boolean) => {

        if (controlOverlayTimer)
            clearTimeout(controlOverlayTimer);

        setShowControls(true);

        if (!indefinate) {

            const timeout = setTimeout(() => {

                setControlOverlayTimer(null);
                setShowControls(false);
            }, 2000);
            setControlOverlayTimer(timeout);
        }
    }

    const toggleIsPlaying = () => {

        const targetIsPlaying = !isPlaying;
        setIsPlaying(targetIsPlaying);
        showControlOverlay();
        flashVisualOverlay(targetIsPlaying ? "start" : "pause");
    }

    const jump = (right?: boolean) => {

        const jumpSeconds = 20;
        let seekSeconds = 0;

        if (right) {

            const positiveTarget = playedSeconds + jumpSeconds;
            seekSeconds = positiveTarget > videoLength ? videoLength : positiveTarget;
            flashVisualOverlay("seekRight");
        }
        else {

            const negativeTarget = playedSeconds - jumpSeconds;
            seekSeconds = negativeTarget < 0 ? 0 : negativeTarget;
            flashVisualOverlay("seekLeft");
        }

        showControlOverlay();
        setPlayedSeconds(seekSeconds);
        seekToSeconds(seekSeconds);
    }

    useEventListener('keydown', (e) => {

        e.preventDefault();

        if (isShowingOverlay)
            return;

        if (e.key == " ")
            toggleIsPlaying();

        if (e.key == "ArrowLeft")
            jump();

        if (e.key == "ArrowRight")
            jump(true);
    });

    return {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        isPlaying,
        subtileTracks,
        controlsOpacity,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isSeeking,
        toggleIsPlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking
    }
}

const subtitles = [
    {
        kind: 'subtitles',
        src: 'http://abydosai.com/hajacska.vtt',
        srcLang: 'hu',
        label: "Magyar",
        mode: "showing"
    }, {
        kind: 'subtitles',
        src: 'http://abydosai.com/hajacska.vtt',
        srcLang: 'en',
        label: "Angol",
        mode: "hidden"
    }
]

export type VideoPlayerStateType = ReturnType<typeof useVideoPlayerState>;

export const VideoPlayer = (props: {
    videoItem: VideoDTO,
    videoPlayerState: VideoPlayerStateType,
    children?: ReactNode
}) => {

    const { videoPlayerState } = props;
    const {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        isPlaying,
        subtileTracks,
        controlsOpacity,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        toggleIsPlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking
    } = videoPlayerState;

    const iconStyle = { width: "70px", height: "70px", color: "white" } as CSSProperties;

    return (
        <Box
            id="fullScreenRoot"
            position="relative"
            height="100%"
            width="100%"
            p="6px"
            ref={playerContainerRef}>

            {/* playback */}
            <Box
                id="playbackWrapper"
                filter={isShowingOverlay ? "blur(4px)" : "blur(0px)"}
                transition="0.3s"
                position="relative"
                height="100%"
                width="100%">

                {/* video wrapper */}
                <Box
                    id="videoWrapper"
                    width="100%"
                    height="100%"
                    pt="56.25%" // to keep 16:9 ratio
                    onClick={() => toggleIsPlaying()}
                    onMouseMove={() => {

                        if (!controlOverlayTimer)
                            showControlOverlay();
                    }}
                    position="relative">

                    {/* the player */}
                    <ReactPlayer
                        playbackRate={1}
                        ref={playerRef}
                        className={classes.player}
                        url={videoUrl}
                        width={"100%"}
                        height={"100%"}
                        controls={false}
                        playing={isPlaying && !isShowingOverlay}
                        onProgress={(playedInfo) => {

                            setPlayedSeconds(playedInfo.playedSeconds);
                        }}
                        onReady={(e) => {

                            setVideoLength(e.getDuration());
                        }}
                        config={{
                            file: {
                                attributes: { crossOrigin: "true" },
                                tracks: subtileTracks,
                            }
                        }} />
                </Box>

                {/* video controls */}
                <Box
                    className={classes.playerControllerWrapper}
                    onMouseEnter={() => showControlOverlay(true)}
                    onMouseLeave={() => showControlOverlay()}
                    opacity={controlsOpacity}
                    transition="0.15s">

                    {/* play/pause */}
                    <button onClick={(e) => toggleIsPlaying()}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </button>

                    {/* timestamp */}
                    <Typography className={classes.playerTimestamp}>
                        {`${secondsToTime(playedSeconds)}/${secondsToTime(videoLength)}`}
                    </Typography>

                    {/* slider */}
                    <Slider
                        className={classes.slider}
                        defaultValue={0}
                        aria-labelledby="discrete-slider"
                        value={playedSeconds}
                        min={0}
                        max={videoLength}
                        onMouseDown={() => setIsSeeking(true)}
                        onChangeCommitted={() => setIsSeeking(false)}
                        onChange={(event, targetSeconds) => {

                            setPlayedSeconds(targetSeconds as number);
                            seekToSeconds(targetSeconds as number);
                        }} />

                    {/* wtf */}
                    <button onClick={(e) => {

                    }}>
                        <ClosedCaption />
                    </button>

                    {/* Fullscreen */}
                    <button onClick={(e) => toggleFullScreen()}>
                        <Fullscreen />
                    </button>
                </Box>

            </Box>

            {/* visual overlay */}
            <AbsoluteFlexOverlay isVisible={isVisualOverlayVisible}>
                {visualOverlayType == "pause" && <PauseIcon style={iconStyle} />}
                {visualOverlayType == "start" && <PlayArrowIcon style={iconStyle} />}
                {visualOverlayType == "seekRight" && <FastForwardIcon style={iconStyle} />}
                {visualOverlayType == "seekLeft" && <FastRewindIcon style={iconStyle} />}
            </AbsoluteFlexOverlay>

            {props.children}
        </Box>
    )
};