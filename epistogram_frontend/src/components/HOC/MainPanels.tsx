import { Flex, FlexProps } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React, { CSSProperties, ReactNode } from 'react';
import { currentVersion } from '../../Environemnt';
import { FlexFloat } from '../universal/FlexFloat';

export const MainWrapper = (props: { style?: CSSProperties, children: ReactNode }) => {

    return <Flex
        id="mainWrapper"
        direction="column"
        height="100%"
        width="100%"
        overflow="hidden"
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
                color: "gray"
            }}
            className="fontSmall">
            Verzió: {currentVersion ?? "currentVersion"}
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

    return (
        <FlexFloat
            borderRadius="none"
            id="leftPanel"
            bg="white"
            zIndex={2}
            flexBasis="400px"
            direction="column"
            align="stretch"
            padding="0 15px 0 15px"
            justify="flex-start"
            boxShadow="none"
            className="dividerBorderRight"
            borderLeft="2px solid #e2e2e2"
            {...props}>

            {props.children}
        </FlexFloat>
    );
};

export const RightPanel = (props: FlexProps & { noPadding?: boolean }) => {

    const { noPadding, ...css } = props;

    return (
        <Flex
            id="rightPanel"
            //bg="#fafafa"
            p={props.noPadding ? undefined : "20px"}
            flex="1"
            overflowX="hidden"
            overflowY="scroll"
            direction="column"
            {...css}>
            {props.children}
        </Flex>
    );
};
