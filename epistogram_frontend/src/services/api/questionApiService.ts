import { useReactQuery2 } from "../../frontendHelpers";
import { AnswerQuestionDTO } from "../../models/shared_models/AnswerQuestionDTO";
import { AnswerResultDTO } from "../../models/shared_models/AnswerResultDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostData } from "../core/httpClient";

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostData<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.questions.answerPractiseQuestion);

    const answerQuestionAsync = (answerIds: number[], questionId: number) => {

        const dto = {
            answerIds,
            questionId
        } as AnswerQuestionDTO;

        return postDataQuery.postDataAsync(dto);
    }

    return {
        answerResults: postDataQuery.result,
        answerQuestionError: postDataQuery.error,
        answerQuestionState: postDataQuery.state,
        answerQuestionAsync,
        clearAnswerResults: postDataQuery.clearCache
    }
}

export const usePractiseQuestion = () => {

    const qr = useReactQuery2<QuestionDTO>(apiRoutes.questions.getPractiseQuestions);

    return {
        practiseQuestion: qr.data,
        practiseQuestionState: qr.state,
        practiseQuestionError: qr.error,
        refetchPractiseQuestion: qr.refetch,
    };
}