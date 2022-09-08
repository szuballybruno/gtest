import { FlexProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoText } from '../controls/EpistoText';
import { LoadingFrame, LoadingFramePropsType } from '../system/LoadingFrame';

export const QuestionnaireLayout = (props: {
    title: string,
    children: ReactNode,
    contentClickable: boolean,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
    buttonWrapperStyles?: React.CSSProperties | undefined,
    answerAction?: () => void
} & FlexProps) => {

    const { title, answerAction, contentClickable, children, loadingProps, onlyShowAnswers, buttonWrapperStyles, ...css } = props;

    return (
        <EpistoFlex2
            id="questionnaireLayoutRoot"
            zIndex='6'
            direction="column"
            p="0 0 20px 0"
            align="center"
            {...css}>

            {/* header */}
            <EpistoFlex2
                display={onlyShowAnswers === true ? 'none' : undefined}
                direction="column"
                align="center"
                p="20px"
                alignSelf="center">

                {/* title */}
                <EpistoFlex2 align="center">

                    <EpistoText
                        isAutoFontSize
                        text={title}
                        style={{ width: '100%', fontSize: 17, fontWeight: 500 }} />
                </EpistoFlex2>

            </EpistoFlex2>

            {/* content */}
            <LoadingFrame {...loadingProps}>
                <EpistoFlex2
                    style={{ ...buttonWrapperStyles }}
                    id="answersListContainer"
                    direction="column"
                    width="100%"
                    mt="20px"
                    pointerEvents={contentClickable ? 'all' : 'none'}>
                    {children}
                </EpistoFlex2>
            </LoadingFrame>
        </EpistoFlex2>
    );
};
