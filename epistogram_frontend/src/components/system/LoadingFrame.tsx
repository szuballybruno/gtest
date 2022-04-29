import { Box, Flex, FlexProps, Heading, Text } from '@chakra-ui/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LoadingStateType } from '../../models/types';
import { isArray } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';

type ErrorType = any | any[];

export type LoadingFramePropsType = {
    loadingState?: LoadingStateType | LoadingStateType[],
    error?: ErrorType,
    onlyRenderIfLoaded?: boolean
};

export const LoadingFrame = (props: FlexProps & LoadingFramePropsType) => {

    const {
        loadingState,
        error,
        onlyRenderIfLoaded,
        ...rootProps
    } = props;

    const [currentLoadingState, setCurrentLoadingState] = useState<LoadingStateType>('idle');
    const showOverlay = currentLoadingState === 'error' || currentLoadingState === 'loading';
    const renderContent = true;//onlyRenderIfLoaded ? !showOverlay : true;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // func 
    const cancelTimeout = useCallback(() => {

        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
    }, []);

    const setNewTimeout = useCallback((fn: () => void) => {

        cancelTimeout();
        timeoutRef.current = setTimeout(fn, 2000);
    }, [cancelTimeout]);

    // error 
    const getError = useCallback((): ErrorType => {

        if (!error)
            return error;

        if (isArray(error))
            return (error as any[])[0];

        return error;
    }, [error]);

    const singleError = useMemo(() => getError(), [getError]);

    // state 
    const getLoadingState = useCallback((): LoadingStateType => {

        if (singleError)
            return 'error';

        if (!loadingState)
            return 'idle';

        if (isArray(loadingState)) {

            const loadingStates = loadingState as LoadingStateType[];

            if (loadingStates.some(x => x === 'error'))
                return 'error';

            if (loadingStates.some(x => x === 'loading'))
                return 'loading';

            if (loadingStates.some(x => x === 'success'))
                return 'success';

            return 'idle';
        }
        else {

            return loadingState as LoadingStateType;
        }
    }, [loadingState, singleError]);

    const targetLoadingState = useMemo(() => getLoadingState(), [getLoadingState]);

    useEffect(() => {

        if (targetLoadingState !== 'loading') {

            cancelTimeout();
            setCurrentLoadingState(targetLoadingState);
        }
        else {

            setNewTimeout(() => {

                setCurrentLoadingState(targetLoadingState);
            });
        }
    }, [targetLoadingState, setCurrentLoadingState, cancelTimeout, setNewTimeout]);

    useEffect(() => {

        return () => cancelTimeout();
    }, [cancelTimeout]);

    return <Flex
        id="loadigFrameRoot"
        position="relative"
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
            left="0"
            bg="var(--gradientBlueBackground)"
            p="30px">

            {/* error */}
            {currentLoadingState === 'error' && <Flex
                align="center"
                direction="column">

                <ErrorOutlineIcon style={{ width: '100px', height: '100px' }}></ErrorOutlineIcon>
                <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
                <Text maxWidth="300px">{singleError?.message}</Text>
            </Flex>}

            {/* loading */}
            {currentLoadingState === 'loading' && <Flex
                id="loadingDisplayContainer"
                direction="column"
                justify="center"
                align="center">

                <CircularProgress style={{ 'color': 'black' }}
                    size={50} />

                <Box pt="20px">
                    <EpistoFont>
                        {translatableTexts.misc.loading}
                    </EpistoFont>
                </Box>
            </Flex>}
        </Flex>}
    </Flex>;
};

