import {
    ArrowDropDown,
    ArrowDropUp,
    ArrowRight,
    FiberManualRecord
} from '@mui/icons-material';
import React, { useMemo, useState } from 'react';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { FlexFloat } from '../controls/FlexFloat';
import { PreviewOverlay } from '../universal/PreviewOverlay';

export type StatisticsCardProps = {
    iconPath?: string
    suffix?: string
    title?: string
    noShadow?: boolean;
    value?: string | number | null
    isOpenByDefault?: boolean
    children?: React.ReactNode
    chartSize?: 'normal' | 'large',
    isPreview?: boolean,
    isMobile?: boolean,
    additionalFunction?: () => void,
    additionalInfo?: {
        value: string,
        suffix: string,
        change: 'up' | 'stagnate' | 'down'
    }
} & EpistoFlex2Props;

const useChangeIcon = (change: any) => {

    return useMemo(() => {

        if (!change)
            return null;

        if (change === 'up')
            return {
                icon: <ArrowDropUp
                    style={{
                        margin: '3px 0 0 0',
                        padding: 0
                    }} />,
                color: 'var(--deepGreen)'
            };

        if (change === 'stagnate')
            return {
                icon: <FiberManualRecord
                    style={{
                        height: 10,
                        width: 10,
                        margin: '2px 3px 0 0',
                        padding: 0
                    }} />,
                color: 'var(--mildOrange)'
            };

        return {
            icon: <ArrowDropDown
                style={{
                    margin: '3px 0 0 0',
                    padding: 0
                }} />,
            color: 'var(--intenseRed)'
        };
    }, [change]);
};

const StatisticsCard = ({
    iconPath,
    isPreview,
    isMobile,
    children,
    additionalFunction,
    additionalInfo,
    isOpenByDefault,
    chartSize,
    title,
    suffix,
    value,
    noShadow,
    ...css
}: StatisticsCardProps) => {

    const [isOpen] = useState(!!isOpenByDefault);
    const changeIcon = useChangeIcon(additionalInfo?.change);

    const mainFontSize = (() => {

        const length = Math.max(1, ((value ?? '') + '').length);

        return `${2.0 / Math.max(1, length * 0.16)}rem`;
    })();

    return (
        <FlexFloat
            id={StatisticsCard.name}
            boxShadow={noShadow ? '' : '0 0 15px #00000015'}
            background="var(--transparentWhite70)"
            gridColumn={chartSize === 'large' ? '1 / -1' : (isOpen ? 'span 2' : 'unset')} // do not remove!!
            gridRow={chartSize === 'large' ? 'span 2' : (isOpen ? 'span 2' : 'unset')} // do not remove!!
            direction="column"
            minWidth={isMobile ? '150px' : '250px'}
            position="relative"
            {...css}>

            {/* preview overlay */}
            {isPreview && <PreviewOverlay
                align="corner" />}

            {/* something */}
            {additionalInfo && <EpistoFlex2
                align="center"
                padding="5px 10px 5px 0"
                position="absolute"
                top="0"
                right="0"
                color={changeIcon?.color}>

                {changeIcon?.icon}

                <EpistoFont
                    style={{
                        fontWeight: 500
                    }}>

                    {[additionalInfo?.value, additionalInfo?.suffix]}
                </EpistoFont>
            </EpistoFlex2>}

            {/* open state */}
            {isOpen && <EpistoFlex2
                flex="1"
                className="roundBorders"
                align="center"
                justify="center"
                background="var(--transparentWhite70)"
                padding="10px"
                gridColumn="auto / span 2"
                gridRow="auto / span 2">

                {children}
            </EpistoFlex2>}

            {/* closed state */}
            {!isOpen && (
                <EpistoFlex2
                    padding={isMobile ? '10px 2px 10px 0' : '5px'}
                    flex="1"
                    align="center">

                    {/* image */}
                    {iconPath
                        ? <img
                            style={{
                                margin: isMobile ? '5px' : '5px 10px 5px 20px',
                                width: isMobile ? 40 : 70,
                                height: isMobile ? 40 : 70,
                                objectFit: 'contain'
                            }}
                            alt=""
                            src={iconPath} />
                        : <EpistoFlex2 width='20px' />}

                    {/* texts */}
                    <EpistoFlex2
                        maxWidth={isMobile ? '100%' : 'calc(100% - 80px)'}
                        width={isMobile ? '100%' : 'calc(100% - 80px)'}
                        direction="column"
                        pr={isMobile ? undefined : '10px'} >

                        {/* value and suffix */}
                        < EpistoFlex2
                            width='100%'
                            align="flex-end">

                            {/* value */}
                            <EpistoFont
                                allowedLines={1}
                                style={{
                                    fontSize: mainFontSize,
                                    lineHeight: 1,
                                    maxWidth: 'calc(100% - 10px)'
                                }}>

                                {(value === undefined || value === null)
                                    ? '-'
                                    : value}
                            </EpistoFont>

                            {/* suffix */}
                            <EpistoFont
                                style={{
                                    marginLeft: '5px'
                                }}>

                                {suffix}
                            </EpistoFont>
                        </EpistoFlex2>

                        {/* title */}
                        <EpistoFont>
                            {title}
                        </EpistoFont>
                    </EpistoFlex2>
                </EpistoFlex2>
            )}

            {/* additional stuff */}
            {additionalFunction && (
                <EpistoButton
                    onClick={() => additionalFunction()}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0
                    }}>

                    <ArrowRight />
                </EpistoButton>
            )}
        </FlexFloat>
    );
};

export default StatisticsCard;
