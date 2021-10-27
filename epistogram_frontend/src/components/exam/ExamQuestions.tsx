import { Grid } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { getAssetUrl, PagingType, usePaging } from "../../frontendHelpers";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { useSaveExamAnswer } from "../../services/examService";
import { useShowErrorDialog } from "../../services/notifications";
import { translatableTexts } from "../../translatableTexts";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ExamLayout } from "./ExamLayout";
import { QuestionAnswer } from "./QuestionAnswer";

export const ExamQuestions = (props: {
    exam: ExamDTO,
    slidesState: PagingType<number>
    questions: QuestionDTO[],
    answerSessionId: number,
    onExamFinished: () => void
}) => {

    const {
        questions,
        answerSessionId,
        onExamFinished,
        exam
    } = props;

    const showError = useShowErrorDialog();
    const { saveExamAnswer, saveExamAnswerState } = useSaveExamAnswer();
    const questionPaging = usePaging(questions, undefined, onExamFinished);
    const currentQuestion = questionPaging.currentItem!;
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const progressPercentage = (100 / questions.length) * questionPaging.currentIndex;

    const handleNextAsync = async () => {

        try {

            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerId: selectedAnswerId!,
                questionId: currentQuestion.questionId
            });

            setSelectedAnswerId(null);
            questionPaging.next();
        } catch (e) {

            showError(e);
        }
    }

    const examContent = <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"80%"}
        flex={1}>

        <Flex p="20px" align="center">
            <img
                style={{
                    borderRadius: "50%",
                    padding: "8px",
                    width: "50px",
                    height: "50px",
                    marginRight: "30px"
                }}
                alt=""
                src="https://static.thenounproject.com/png/92068-200.png"
                className="tinyShadow" />

            <Text
                as="text"
                fontSize={"1.3rem"}>
                {currentQuestion.questionText}
            </Text>
        </Flex>

        {/* answers */}
        <Flex
            direction={"row"}
            justifyContent={"center"}
            pt={10}
            w={"100%"}
            mx={200}>
            <Grid
                templateColumns={"repeat(2, 1fr)"}
                gridAutoRows={"minmax(0,1fr)"}
                direction={"column"}
                gridGap={10}
                flex={1}>
                {currentQuestion
                    .answers
                    .map((answer, index) => {

                        const isAnswerSelected = answer.answerId === selectedAnswerId;

                        return <QuestionAnswer
                            onClick={() => setSelectedAnswerId(answer.answerId)}
                            answerText={answer.answerText}
                            isSelected={isAnswerSelected} />
                    })}
            </Grid>
        </Flex>
    </Flex>

    return <LoadingFrame
        className="whall"
        loadingState={saveExamAnswerState}
        flex="1"
        direction={"column"}
        alignItems={"center"}
        w={"100%"}
        px={40}>

        <ExamLayout
            headerLeftItem={<Flex align="center">
                <img
                    alt=""
                    src={getAssetUrl("course_page_icons/curriculum_test.svg")}
                    className="square35" />
                <Typography style={{ marginLeft: "10px" }}>
                    {questions.length}/{questionPaging.currentIndex + 1}
                </Typography>
            </Flex>}
            headerCenterText={exam.title}
            exitExamAction={() => { }}
            handleNext={handleNextAsync}
            showNextButton={!!selectedAnswerId}
            nextButtonTitle={translatableTexts.exam.nextQuestion}
            content={examContent}
            progressValue={progressPercentage} />
    </LoadingFrame>
}