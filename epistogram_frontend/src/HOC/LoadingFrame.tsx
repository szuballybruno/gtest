import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { isArray } from "../frontendHelpers";
import { LoadingStateType } from "../models/types";
import { DialogStateType } from "./DialogFrame";

export const LoadingFrame = (props: FlexProps & {
    loadingState: LoadingStateType | LoadingStateType[],
    error?: any | any[],
    onlyRenderIfLoaded?: boolean
}) => {

    const { loadingState, error, onlyRenderIfLoaded, ...rootProps } = props;
    const singleError = getError(error);
    const state = getLoadingState(loadingState);
    const showOverlay = state == "error" || state == "loading";
    const renderContent = onlyRenderIfLoaded ? !showOverlay : true;
    const [prevState, setPrevState] = useState<LoadingStateType>("idle");

    useEffect(() => {

        if (prevState === state)
            return;

        setTimeout(() => {

            if (prevState === state)
                return;

            setPrevState(state);
        }, 1000);
    }, [state]);

    const finalState = prevState;

    return <Flex
        id="loadigFrameRoot"
        position="relative"
        width="100%"
        height="100%"
        flex="1"
        {...rootProps}>

        {/* content */}
        {renderContent && props.children}

        {/* overlay */}
        {showOverlay && <Flex
            id="loadingFrameCenterFlex"
            flex="1"
            justify="center"
            align="center"
            overflow="hidden"
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            bg="#fffffff0"
            p="30px">

            {/* error */}
            {finalState == "error" && <Flex align="center" direction="column">
                <ErrorOutlineIcon style={{ width: "100px", height: "100px" }}></ErrorOutlineIcon>
                <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
                <Text maxWidth="300px">{singleError?.message}</Text>
            </Flex>}

            {/* loading */}
            {finalState == "loading" && <Flex
                id="loadingDisplayContainer"
                direction="column"
                justify="center"
                align="center">

                <CircularProgress style={{ 'color': 'black' }} size={50} />

                <Box pt="20px">
                    <Typography>Loading...</Typography>
                </Box>
            </Flex>}
        </Flex>}
    </Flex>
}

const getLoadingState = (loadingState: LoadingStateType | LoadingStateType[]) => {

    if (isArray(loadingState)) {

        const loadingStates = loadingState as LoadingStateType[];

        if (loadingStates.some(x => x == "error"))
            return "error" as LoadingStateType;

        if (loadingStates.some(x => x == "idle" || x == "loading"))
            return "loading" as LoadingStateType;

        return "success" as LoadingStateType;
    }
    else {

        return loadingState as LoadingStateType;
    }
}

const getError = (error?: any | any[]) => {

    if (!error)
        return error;

    if (isArray(error))
        return (error as any[])[0];

    return error;
}