import { QueryService } from '../../static/XQuery/XQueryReact';
import { AnswerDTO } from '@episto/communication';
import { AnswerSignupQuestionDTO } from '@episto/communication';
import { PersonalityAssessmentDTO } from '@episto/communication';
import { SurveyDataDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { usePostDataUnsafe } from '../core/httpClient';

const usePersonalityData = () => {

    const qr = QueryService.useXQuery<PersonalityAssessmentDTO>(apiRoutes.survey.getUserPersonalityData);

    return {
        personalityData: qr.data,
        personalityDataState: qr.state,
        personalityDataError: qr.error
    };
};

const useSurveyData = () => {

    const qr = QueryService
        .useXQuery<SurveyDataDTO>(apiRoutes.survey.getSurveyData);

    return {
        surveyData: qr.data,
        surveyDataStatus: qr.state,
        surveyDataError: qr.error,
        refetchSurveyData: qr.refetch
    };
};

const useCheckIfSurveySkippable = () => {

    const qr = usePostDataUnsafe<void, boolean>(apiRoutes.survey.checkIfSurveySkippable);

    return {
        checkIfSurveySkippable: qr.postDataAsync,
        checkIfSurveySkippableStatus: qr.state
    };
};

const useCompleteSurvey = () => {

    const qr = usePostDataUnsafe(apiRoutes.survey.completeSignupSurvey);

    return {
        completeSurveyStatus: qr.state,
        completeSurveyAsync: qr.postDataAsync
    };
};

const useAnswerSurveyQuestion = () => {

    const qr = usePostDataUnsafe<AnswerSignupQuestionDTO, AnswerDTO>(apiRoutes.survey.answerSurveyQuestion);

    return {
        postSurveyAnswerStatus: qr.state,
        postSurveyAnswerAsync: qr.postDataAsync,
        correctAnswerId: qr.result?.answerVersionId ?? null
    };
};

export const SurveyApiService = {
    usePersonalityData,
    useCompleteSurvey,
    useSurveyData,
    useAnswerSurveyQuestion,
    useCheckIfSurveySkippable
};