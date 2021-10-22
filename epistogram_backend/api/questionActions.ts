import { Request } from "express";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { answerVideoQuestionAsync } from "../services/videoService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const answerVideoQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const dto = withValueOrBadRequest<AnswerQuestionDTO>(req.body);
    const answerId = withValueOrBadRequest<number>(dto.answerId, "number");
    const questionId = withValueOrBadRequest<number>(dto.questionId, "number");
    const answerSessionId = withValueOrBadRequest<number>(dto.answerSessionId, "number");

    return answerVideoQuestionAsync(answerSessionId, questionId, answerId);
});