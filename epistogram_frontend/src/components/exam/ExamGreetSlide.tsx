import { Flex } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React from 'react';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { Environment } from '../../static/Environemnt';

import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { ExamLayout } from './ExamLayout';
import { ExamResultStats } from './ExamResultStats';

export const ExamGreetSlide = (props: {
    exam: ExamPlayerDataDTO,
    startExam: () => void
}) => {

    const {
        exam,
        startExam
    } = props;

    return <ExamLayout
        justify='flex-start'
        headerCenterText={exam.title}
        showNextButton={exam.canTakeAgain}
        handleNext={startExam}
        nextButtonTitle={translatableTexts.exam.startExam}>

        <Flex
            direction="column"
            align="center"
            justify='center'
            background='var(--transparentWhite70)'
            flex="1"
            p='20px'
            className="whall roundBorders mildShadow">
            <img
                src={Environment.getAssetUrl('/images/examCover.png')}
                alt={''}
                style={{
                    objectFit: 'contain',
                    maxHeight: 200,
                    margin: '30px 0'
                }} />

            <EpistoFont
                fontSize="fontHuge">

                {exam.title}
            </EpistoFont>

            <EpistoFont
                style={{
                    padding: '30px',
                    maxWidth: '400px'
                }}>

                {translatableTexts.exam.greetText}
            </EpistoFont>

            {/* if previously completed  */}
            {exam.isCompletedPreviously && <>

                {/* stats label */}
                <EpistoFont>

                    {translatableTexts.exam.statsLabelText}
                </EpistoFont>

                {/* stats */}
                <Flex
                    mt="20px"
                    align="center"
                    justify="center"
                    width="100%">

                    <ExamResultStats
                        correctAnswerRate={exam!.correctAnswerRate}
                        totalQuestionCount={exam!.questionsCount}
                        correctAnswerCount={exam!.fullyCorrectlyAnsweredQuestionsCount}
                        examLengthSeconds={exam!.examLengthSeconds}
                        examSuccessRateDiffFromCompany={exam!.examSuccessRateDiffFromCompany} />
                </Flex>
            </>}
        </Flex>
    </ExamLayout>;
};
