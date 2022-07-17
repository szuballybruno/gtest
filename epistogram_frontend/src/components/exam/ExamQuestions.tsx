import { Grid } from '@chakra-ui/layout';
import { Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSaveExamAnswer } from '../../services/api/examApiService';
import { useShowErrorDialog } from '../../services/core/notifications';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { QuestionTypeEnum } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Environment } from '../../static/Environemnt';
import { epochDates, usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { LoadingFrame } from '../system/LoadingFrame';
import { ExamLayout } from './ExamLayout';
import { ExamLayoutContent } from './ExamLayoutContent';
import { QuestionAnswer } from './QuestionAnswer';

export const ExamQuestions = (props: {
    exam: ExamPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    onExamFinished: () => void,
    exitExamAction?: () => void,
    hideLoading?: boolean
}) => {

    const {
        answerSessionId,
        onExamFinished,
        exitExamAction,
        exam,
        hideLoading
    } = props;

    const questions = exam.questions;
    const showError = useShowErrorDialog();
    const { saveExamAnswer, saveExamAnswerState } = useSaveExamAnswer();
    const questionPaging = usePaging({ items: questions, onNextOverNavigation: onExamFinished });
    const currentQuestion = questionPaging.currentItem!;
    const [selectedAnswerIds, setSelectedAnswerIds] = useState<Id<'Answer'>[]>([]);
    const progressPercentage = (100 / questions.length) * questionPaging.currentIndex;
    const isSingleAnswerMode = currentQuestion.typeId === QuestionTypeEnum.singleAnswer;
    const hasSelectedAnswer = selectedAnswerIds.length > 0;
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());

    const handleNextAsync = async () => {

        const timeElapsed = epochDates(new Date(), showUpTime);

        try {

            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerIds: selectedAnswerIds!,
                questionVersionId: currentQuestion.questionVersionId,
                elapsedSeconds: timeElapsed
            });

            setShowUpTime(new Date());
            setSelectedAnswerIds([]);
            questionPaging.next();
        } catch (e) {

            showError(e);
        }
    };

    const setAnswerSelectedState = (answerId: Id<'Answer'>, isSelected: boolean) => {

        if (isSelected) {

            if (isSingleAnswerMode) {

                setSelectedAnswerIds([answerId]);
            }
            else {

                setSelectedAnswerIds([...selectedAnswerIds, answerId]);
            }
        }
        else {

            setSelectedAnswerIds(selectedAnswerIds
                .filter(x => x !== answerId));
        }
    };

    return <LoadingFrame
        loadingState={hideLoading ? undefined : saveExamAnswerState}
        flex="1"
        direction={'column'}
        alignItems={'center'}
        width="100%">

        <ExamLayout
            headerLeftItem={<Flex align="center">

                <img
                    alt=""
                    src={Environment.getAssetUrl('course_page_icons/curriculum_test.svg')}
                    className="square35" />

                <EpistoFont style={{ marginLeft: '10px' }}>
                    {questions.length}/{questionPaging.currentIndex + 1}
                </EpistoFont>
            </Flex>}
            headerCenterText={exam.title}
            exitExamAction={exitExamAction}
            handleNext={handleNextAsync}
            showNextButton={hasSelectedAnswer}
            nextButtonTitle={translatableTexts.exam.nextQuestion}
            progressValue={progressPercentage}>

            <ExamLayoutContent
                title={currentQuestion.questionText}>

                {/* answers */}
                <Flex
                    direction={'row'}
                    justifyContent={'center'}
                    pt={10}
                    width="100%">

                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gridAutoRows="minmax(0,1fr)"
                        gridGap="10px">

                        {currentQuestion
                            .answers
                            .map((answer, index) => {

                                const isAnswerSelected = selectedAnswerIds
                                    .some(x => x === answer.answerId);

                                return <QuestionAnswer
                                    key={index}
                                    minWidth={400}
                                    onClick={(isSelected) => setAnswerSelectedState(answer.answerId, isSelected)}
                                    answerText={answer.answerText}
                                    isSelected={isAnswerSelected} />;
                            })}
                    </Grid>
                </Flex>
            </ExamLayoutContent>
        </ExamLayout>
    </LoadingFrame>;
};
