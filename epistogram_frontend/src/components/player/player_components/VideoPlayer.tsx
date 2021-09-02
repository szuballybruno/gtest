import { Box, Flex } from "@chakra-ui/react";
import { Slider, Typography } from "@material-ui/core";
import { ClosedCaption, Fullscreen, Pause, PlayArrow } from "@material-ui/icons";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { secondsToTime } from "../../../frontendHelpers";
import { VideoDTO } from "../../../models/shared_models/VideoDTO";
import { OverlayQuestionnaire } from "./overlay/OverlayQuestionnaire";
import classes from "./player.module.scss";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import useEventListener from 'react-use-event-listener'
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const downloadedTracks = [
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

type visualOverlayType = "counter" | "pause" | "start" | "seekRight" | "seekLeft";

const VideoPlayer = (props: {
    videoItem: VideoDTO
}) => {

    const videoUrl = props.videoItem.url;
    const questions = props.videoItem.questions;
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const [controlOverlayTimer, setControlOverlayTimer] = useState<NodeJS.Timeout | null>(null);
    const controlsOpacity = showControls || !isPlaying ? 1 : 0;
    const [visualOverlayType, setVisualOverlayType] = useState<visualOverlayType>("start");
    const [isVisualOverlayVisible, setIsVisualOverlayVisible] = useState(false);

    const toggleFullScreen = () => {

        // @ts-ignore
        screenfull.toggle(playerContainerRef.current);
    };

    const seekToSeconds = (seconds: number) => {

        // @ts-ignore
        playerRef.current.seekTo(seconds as number)
    }

    const flashVisualOverlay = (visualOverlayType: visualOverlayType) => {

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

    const getVisualOverlay = () => {

        const iconStyle = { width: "70px", height: "70px", color: "white" } as CSSProperties;

        if (visualOverlayType == "pause")
            return <PauseIcon style={iconStyle}></PauseIcon>

        if (visualOverlayType == "start")
            return <PlayArrowIcon style={iconStyle}></PlayArrowIcon>

        if (visualOverlayType == "seekRight")
            return <FastForwardIcon style={iconStyle}></FastForwardIcon>

        if (visualOverlayType == "seekLeft")
            return <FastRewindIcon style={iconStyle}></FastRewindIcon>

        throw new Error("Invalid overlay type! " + visualOverlayType);
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

        if (e.key == " ")
            toggleIsPlaying();

        if (e.key == "ArrowLeft")
            jump();

        if (e.key == "ArrowRight")
            jump(true);
    });

    return (
        <Box
            id="videoRoot"
            position="relative"
            height="100%"
            width="100%"
            ref={playerContainerRef}>

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
                    playing={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onProgress={(playedInfo) => {

                        setPlayedSeconds(playedInfo.playedSeconds);
                    }}
                    onReady={(e) => {

                        setVideoLength(e.getDuration());
                    }}
                    config={{
                        file: {
                            attributes: { crossOrigin: "true" },
                            tracks: downloadedTracks,
                        }
                    }} />
            </Box>

            {/* visual overlay */}
            <Flex
                id="visualOverlay"
                position="absolute"
                width="100%"
                height="100%"
                top="0"
                pointerEvents="none"
                align="center"
                transition="0.2s"
                opacity={isVisualOverlayVisible ? 1 : 0}
                justify="center">
                {getVisualOverlay()}
            </Flex>

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

            {/* questionnaier */}
            <OverlayQuestionnaire
                videoProgressSeconds={playedSeconds}
                videoLengthSeconds={videoLength}
                questions={questions} />
        </Box>
    )
};

export default VideoPlayer
