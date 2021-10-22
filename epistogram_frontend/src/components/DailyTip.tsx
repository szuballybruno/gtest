import { Box, Flex, FlexProps } from "@chakra-ui/layout"
import { Typography } from "@mui/material"
import { useState } from "react"
import ReactPlayer from "react-player"
import { getAssetUrl, usePaging } from "../frontendHelpers"
import { useDailyTip } from "../services/miscService"
import { translatableTexts } from "../translatableTexts"
import { EpistoDialog, useEpistoDialogLogic } from "./EpistoDialog"
import { EpistoButton } from "./universal/EpistoButton"
import { SlidesDisplay } from "./universal/SlidesDisplay"

export const DailyTip = (props: {} & FlexProps) => {

    const { ...css } = props;
    const { currentIndex, next, previous } = usePaging([1, 2]);

    const dialogLogic = useEpistoDialogLogic({
        title: "Napi tipped",
    });

    const { dailyTipData, dailyTipError, dailyTipState } = useDailyTip();

    const openDialog = () => dialogLogic.openDialog();

    const DescriptionSlide = () => <Typography variant={"h6"} fontSize="16px">
        {dailyTipData?.description}
    </Typography>;

    const VideoSlide = () => {

        const [isPlaying, setIsPlaying] = useState(false);

        return <Box position={"relative"} onClick={openDialog} cursor="pointer">
            <Flex
                display={isPlaying ? "none" : undefined}
                top="0"
                position="absolute"
                align="center"
                justify="center"
                className="whall">
                <Box
                    className="square70 circle"
                    padding="10px"
                    background="#0000004f"
                    boxShadow="0 0 20px 16px #0000004f">
                    <img
                        style={{
                            transform: "translateX(5px)",
                            filter: "brightness(2)"
                        }}
                        alt=""
                        src={getAssetUrl("/icons/play2.svg")} />
                </Box>
            </Flex>
            <ReactPlayer
                width="100%"
                height="100%"
                style={{
                    margin: "auto"
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={true}
                url={dailyTipData?.videoUrl} />
        </Box>
    }

    const toggleDisplayModes = () => {

        if (currentIndex === 0) {

            next();
        }
        else {

            previous();
        }
    }

    return <Flex direction="column" justify="center" {...css}>

        <EpistoDialog logic={dialogLogic} fullScreenX={true} showCloseButton={true}>
            <Flex direction="column" align="center">
                <Flex
                    id="customContentRoot"
                    position={"relative"}
                    height="calc(min(min(80vw, 1400px), 140vh) * 0.5625)"
                    cursor="pointer"
                    width="min(min(80vw, 1400px), 140vh)"
                    align="center"
                    justify="center"
                    margin="auto">

                    <SlidesDisplay
                        alwaysRender
                        index={currentIndex}
                        slides={[
                            VideoSlide,
                            DescriptionSlide
                        ]} />
                </Flex>

                <Flex>
                    <EpistoButton variant="outlined" style={{ margin: "10px" }}>
                        {translatableTexts.tipOfTheDay.prevoiusVideos}
                    </EpistoButton>

                    <EpistoButton variant="outlined" style={{ margin: "10px" }} onClick={toggleDisplayModes}>
                        {translatableTexts.tipOfTheDay.description}
                    </EpistoButton>
                </Flex>
            </Flex>
        </EpistoDialog >

        <SlidesDisplay
            alwaysRender
            index={currentIndex}
            slides={[
                VideoSlide,
                DescriptionSlide
            ]} />

        <EpistoButton
            style={{ alignSelf: "center" }}
            variant="outlined"
            onClick={toggleDisplayModes}>
            {currentIndex === 0
                ? translatableTexts.tipOfTheDay.description
                : translatableTexts.tipOfTheDay.video}
        </EpistoButton>
    </Flex >
}