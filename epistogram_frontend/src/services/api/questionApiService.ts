import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
import { usePostData } from '../core/httpClient';

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostData<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.questions.answerPractiseQuestion);

    const answerQuestionAsync = (answerIds: Id<'Answer'>[], questionVersionId: Id<'QuestionVersion'>) => {

        const dto = {
            answerIds,
            questionVersionId
        } as AnswerQuestionDTO;

        return postDataQuery.postDataAsync(dto);
    };

    return {
        answerResults: postDataQuery.result,
        answerQuestionError: postDataQuery.error,
        answerQuestionState: postDataQuery.state,
        answerQuestionAsync,
        clearAnswerResults: postDataQuery.clearCache
    };
};

export const usePractiseQuestion = () => {

    const qr = QueryService.useXQuery<QuestionDTO>(apiRoutes.questions.getPractiseQuestions);

    return {
        practiseQuestion: qr.data,
        practiseQuestionState: qr.state,
        practiseQuestionError: qr.error,
        refetchPractiseQuestion: qr.refetch,
    };
};