
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { staticProvider } from "../staticProvider";
import { toAnswerDTO, toQuestionAnswerDTO, toQuestionDTO } from "./mappings";

export const getStartupQuestionsAsync = async () => {

    const questions = await staticProvider
        .ormConnection
        .getRepository(Question)
        .createQueryBuilder("q")
        .where("q.isSignupQuestion = true")
        .leftJoinAndSelect("q.answers", "a")
        .getMany();

    return questions
        .map(x => toQuestionDTO(x));
}

export const getQuestionAnswersAsync = async (userId: number) => {

    const questionAnswers = await staticProvider
        .ormConnection
        .getRepository(QuestionAnswer)
        .createQueryBuilder("qa")
        .where("qa.userId = :userId", { userId })
        .leftJoinAndSelect("qa.question", "q")
        .where("q.isSignupQuestion = true")
        .getMany();

    return questionAnswers
        .map(qa => toQuestionAnswerDTO(qa));
}

export const answerQuestionAsync = async (userId: number, questionId: number, answerId: number) => {

    // save question answer
    const existingAnswer = await staticProvider
        .ormConnection
        .getRepository(QuestionAnswer)
        .findOne({
            where: {
                questionId: questionId,
                answerId: answerId,
                userId: userId
            }
        });

    await staticProvider
        .ormConnection
        .getRepository(QuestionAnswer)
        .save({
            id: existingAnswer?.id,
            answerId: answerId,
            questionId: questionId,
            userId: userId
        });

    // get correct answer
    const correctAnswer = await staticProvider
        .ormConnection
        .getRepository(Question)
        .createQueryBuilder("q")
        .leftJoinAndSelect("q.answers", "a")
        .where("q.id = :questionId", { questionId })
        .andWhere("a.isCorrect = true")
        .getOneOrFail();

    return toAnswerDTO(correctAnswer.answers[0]);
}

export const getReandomQuestion = () => {
    return {
        questionId: 1,
        questionText: "My fantastic question",
        answers: [
            {
                answerId: 1,
                answerText: "Answer 1"
            } as AnswerDTO,
            {
                answerId: 2,
                answerText: "Answer 2"
            } as AnswerDTO,
            {
                answerId: 3,
                answerText: "Answer 3"
            } as AnswerDTO,
            {
                answerId: 3,
                answerText: "Answer 4"
            } as AnswerDTO
        ]
    } as QuestionDTO
}