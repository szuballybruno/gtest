import { Flex, FlexProps, useMediaQuery } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React, { CSSProperties, ReactNode, useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuideHelp } from '../../services/core/userGuidingService';
import { currentVersion } from '../../static/Environemnt';
import { getAssetUrl } from '../../static/frontendHelpers';
import Navbar from '../navbar/Navbar';
import { EpistoButton } from '../universal/EpistoButton';
import { FlexFloat } from '../universal/FlexFloat';
import { CurrentUserContext } from './AuthenticationFrame';

export const MainWrapper = (props: { style?: CSSProperties, children: ReactNode }) => {

    return <Flex
        background="var(--gradientBlueBackground)"
        id="mainWrapper"
        direction="column"
        height="100%"
        width="100%"
        maxW="1920px"
        margin="0 auto"
        position="relative"
        style={props.style}>

        {props.children}

        {/* version */}
        <Typography
            style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                zIndex: 3,
                color: "gray",
                background: "white",
                padding: "5px",
                borderRadius: "5px"
            }}
            className="fontMid mildShadow">
            Verzió: {currentVersion ?? "1999.01.01.01:01"}
        </Typography>
    </Flex>
};

export const ContentWrapper = (props: {
    children: ReactNode
} & FlexProps) => {

    const { children, ...css } = props;

    return <Flex
        id="contentWrapper"
        flex="1"
        overflow="hidden"
        {...css}>
        {children}
    </Flex>
};

export const LeftPanel = (props: FlexProps) => {

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext);
    const { navigate } = useNavigation();

    return (
        <FlexFloat
            borderRadius="none"
            id="leftPanel"
            bg="white"
            zIndex={2}
            flexBasis="320px"
            maxW="320px"
            direction="column"
            align="stretch"
            padding="25px 15px 0 15px"
            className="dividerBorderRight"
            position="relative"
            //borderLeft="2px solid #e2e2e2"
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)"
            {...props}>

            {/* logo link */}
            <Flex w="100%" alignItems={"center"} justifyContent="flex-start" mb="20px">
                <img
                    src={getAssetUrl("/images/logo.svg")}
                    style={{
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                        margin: "10px 10px",
                        padding: 0
                    }}
                    alt=""
                    onClick={() => {

                        if (user?.userActivity?.canAccessApplication)
                            navigate(homeUrl);
                    }} />
            </Flex>

            {/* magic powder top right */}
            <img
                style={{
                    position: "absolute",
                    right: 23,
                    top: -30,
                    width: 120,
                    transform: "rotate(270deg)",
                    objectFit: "contain",
                    zIndex: -1,
                }}
                src={getAssetUrl("/images/bg-art-6.png")} alt="" />

            {props.children}

            {/* magic powder top right */}
            <img
                style={{
                    position: "absolute",
                    left: -10,
                    bottom: 0,
                    width: 170,
                    transform: "rotate(0deg) scale(-1,1)",
                    objectFit: "contain",
                    zIndex: -1,
                }}
                src={getAssetUrl("/images/bela3D.png")} alt="" />

            {/* tina image */}
            <Flex
                direction="column"
                position="absolute"
                bottom="160"
                right="25"
                w="170px">

                <Typography
                    fontSize="13px"
                    mb="5px">
                    Szia, én Tina vagyok, a te személyes segítőd, ha elakadnál, kérdezz bátran!
                </Typography>
            </Flex>

            {/* tina button */}
            <Flex
                direction="column"
                position="absolute"
                bottom="100"
                right="20"
                w="130px">

                <EpistoButton
                    variant='colored'
                    onClick={() => startUserGuideHelp()}>
                    
                    Segítség
                </EpistoButton>
            </Flex>
        </FlexFloat>
    );
};

export const RightPanel = (props: FlexProps & { noPadding?: boolean }) => {

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    const { noPadding, ...css } = props;

    return (
        <Flex
            id="rightPanel"
            p={props.noPadding ? undefined : "0 10px 40px 10px"}
            overflowY="scroll"
            flex="1"
            {...css}>

            {/* left side dynamic spacer */}
            {isSmallerThan1400 && <Flex flex="0 1 100px" />}

            {/* center wrapper */}
            <Flex direction="column" align="center" flex="1">

                <Navbar />

                {props.children}
            </Flex>

            {/* right side dynamic spacer */}
            {isSmallerThan1400 && <Flex flex="0 1 100px" />}
        </Flex>
    );
};
