import { Grid } from '@chakra-ui/layout';
import { useState } from 'react';
import { ExamApiService } from '../../services/api/examApiService';
import browser from '../../services/core/browserSniffingService';
import { useShowErrorDialog } from '../../services/core/notifications';
import { AnswerDTO } from '@episto/communication';
import { ExamPlayerDataDTO } from '@episto/communication';
import { GivenAnswerDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { Environment } from '../../static/Environemnt';
import { epochDates, useIsMobileView, usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { LoadingFrame } from '../system/LoadingFrame';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { ExamAbortDialog } from './ExamAbortDialog';
import { ExamLayout } from './ExamLayout';
import { ExamLayoutContent } from './ExamLayoutContent';
import { QuestionAnswer } from './QuestionAnswer';

export const ExamQuestions = ({
    answerSessionId,
    onExamFinished,
    handleAbortExam,
    exam: { questions, title: examTitle },
    hideLoading,
    isExamInProgress
}: {
    exam: ExamPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    onExamFinished: () => void,
    handleAbortExam: () => void
    isExamInProgress: boolean
    hideLoading?: boolean

}) => {

    // paging
    const questionPaging = usePaging({
        items: questions,
        onNextOverNavigation: onExamFinished
    });

    // dialogs 
    const showError = useShowErrorDialog();
    const abortDialog = useEpistoDialogLogic(ExamAbortDialog);

    // http
    const { saveExamAnswers, saveExamAnswersState } = ExamApiService
        .useSaveExamAnswers();

    // state 
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());
    const [givenAnswers, setGivenAnswers] = useState<{ [K: string]: GivenAnswerDTO }>({});

    // calc 
    const currentQuestion = questionPaging.currentItem!;
    const isLastQuestion = questionPaging.isLast;

    const currentGivenAnswer = (givenAnswers[currentQuestion.questionVersionId + ''] ?? null) as GivenAnswerDTO | null;
    const isMobile = useIsMobileView();
    const isIPhone = browser.isIPhone;

    /**
     * Open abort dialog 
     */
    const handleOpenAbortDialog = () => {

        abortDialog.openDialog();
    };

    /**
     * Handle go to prev question
     */
    const handleGoToPreviousQuestion = () => {

        questionPaging.previous();
    };

    /**
     * Handle finish exam
     */
    const handleFinishExam = async () => {

        try {
            await saveExamAnswers({
                answerSessionId: answerSessionId,
                givenAnswers: Object
                    .values(givenAnswers)
            });
            onExamFinished();
        }
        catch (e) {

            showError(e);
        }
    };

    /**
     * Handle go to next question 
     */
    const handleNextAsync = async () => {

        if (!isExamInProgress)
            return;

        isLastQuestion
            ? handleOpenAbortDialog()
            : questionPaging.next();
    };

    /**
     * Handle abort
     */
    const handleAbortAsync = async () => {

        if (!isExamInProgress)
            return;

        handleOpenAbortDialog();
    };

    /**
     * Sets the selected state for a specific answer 
     */
    const handleSetAnswerSelectedState = (answer: AnswerDTO, isSelected: boolean) => {

        const currentSelectedAnswers = currentGivenAnswer?.answerVersionIds ?? [];

        const newSelectedAnswerIds = isSelected
            ? [...currentSelectedAnswers.filter(x => x !== answer.answerVersionId), answer.answerVersionId]
            : currentSelectedAnswers.filter(x => x !== answer.answerVersionId);

        const elapsedSeconds = epochDates(new Date(), showUpTime);

        const newGivenAnswers = { ...givenAnswers };

        // set given answer 
        if (newSelectedAnswerIds.length > 0) {

            newGivenAnswers[currentQuestion.questionVersionId + ''] = {
                answerVersionIds: newSelectedAnswerIds,
                elapsedSeconds,
                questionVersionId: currentQuestion.questionVersionId
            };
        }

        // delete given answer
        else {

            delete newGivenAnswers[currentQuestion.questionVersionId + ''];
        }

        setGivenAnswers(newGivenAnswers);
    };

    /**
     * Gets the is selected state for a specific answer  
     */
    const getAnswerIsSelectedState = (answer: AnswerDTO) => {

        return currentGivenAnswer
            ? currentGivenAnswer
                .answerVersionIds
                .some(answerVersionId => answerVersionId === answer.answerVersionId)
            : false;
    };

    return <LoadingFrame
        flex="1"
        direction={'column'}
        alignItems={'center'}
        width="100%">

        {/* abort dialog */}
        <ExamAbortDialog
            dialogLogic={abortDialog}
            answeredQuestionsCount={Object.keys(givenAnswers).length}
            handleAbortExam={handleAbortExam}
            handleExamFinished={handleFinishExam}
            questions={questions} />

        <ExamLayout
            maxH={(() => {

                if (isIPhone) {
                    return 'calc(100vh - 150px)';
                }

                if (isMobile) {
                    return 'calc(100vh - 120px)';
                }
            })()}
            height={isMobile ? 'calc(100% - 120px)' : undefined}
            headerLeftItem={(
                <EpistoFlex2 align="center">
                    <img
                        alt=""
                        src={Environment.getAssetUrl('course_page_icons/curriculum_test.svg')}
                        className="square35" />

                    <EpistoFont style={{ marginLeft: '10px' }}>
                        {questions.length}/{questionPaging.currentIndex + 1}
                    </EpistoFont>
                </EpistoFlex2>
            )}
            stepperParams={{
                getIsCompleted: question => !!givenAnswers[question.questionVersionId + ''],
                logic: questionPaging
            }}
            headerCenterText={examTitle}
            headerButtons={[
                {
                    title: 'Vizsga befejezése',
                    action: handleAbortAsync
                }
            ]}
            handleBack={handleGoToPreviousQuestion}
            footerButtons={[
                {
                    title: isLastQuestion
                        ? 'Vizsga befejezése'
                        : translatableTexts.exam.nextQuestion,
                    action: handleNextAsync
                }
            ]}
            isFirst={questionPaging.currentIndex === 0}>

            <ExamLayoutContent
                style={{
                    maxHeight: 'calc(100% - 10px)'
                }}
                title={currentQuestion.questionText}>

                {/* answers */}
                <EpistoFlex2
                    direction={'row'}
                    justifyContent={'center'}
                    pt='10px'
                    width="100%">

                    {isMobile
                        ? <EpistoFlex2
                            px='5px'
                            direction='column'>

                            {currentQuestion
                                .answers
                                .map((answer, index) => {

                                    return <QuestionAnswer
                                        mb='10px'
                                        key={index}
                                        onClick={isSelected => handleSetAnswerSelectedState(answer, isSelected)}
                                        answerText={answer.answerText}
                                        isSelected={getAnswerIsSelectedState(answer)} />;
                                })}
                        </EpistoFlex2>
                        : <Grid
                            templateColumns="repeat(2, 1fr)"
                            gridAutoRows="minmax(0,1fr)"
                            gridGap="10px">

                            {currentQuestion
                                .answers
                                .map((answer, index) => {

                                    return <QuestionAnswer
                                        key={index}
                                        minWidth={400}
                                        onClick={isSelected => handleSetAnswerSelectedState(answer, isSelected)}
                                        answerText={answer.answerText}
                                        isSelected={getAnswerIsSelectedState(answer)} />;
                                })}
                        </Grid>}
                </EpistoFlex2>
            </ExamLayoutContent>
        </ExamLayout>
    </LoadingFrame >;
};