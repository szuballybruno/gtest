import { AnswerSession } from '../models/entity/AnswerSession';
import { ExamData } from '../models/entity/exam/ExamData';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { AnswerSessionView } from '../models/views/AnswerSessionView';
import { ExamResultView } from '../models/views/ExamResultView';
import { ExamPlayerDataView } from '../models/views/ExamPlayerDataView';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { ExamPlayerDataDTO } from '../shared/dtos/ExamPlayerDataDTO';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { toExamResultDTO } from './misc/mappings';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserSessionActivityService } from './UserSessionActivityService';
import { ExamVersionView } from '../models/views/ExamVersionView';
import { QuestionData } from '../models/entity/question/QuestionData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { Id } from '../shared/types/versionId';
import { LatestExamView } from '../models/views/LatestExamView';

export class ExamService extends QueryServiceBase<ExamData> {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _userSessionActivityService: UserSessionActivityService;
    private _quesitonAnswerService: QuestionAnswerService;
    private _questionsService: QuestionService;

    constructor(
        userCourseBridgeService: UserCourseBridgeService,
        ormService: ORMConnectionService,
        userSessionActivityService: UserSessionActivityService,
        quesitonAnswerService: QuestionAnswerService,
        questionsService: QuestionService,
        mapperService: MapperService) {

        super(mapperService, ormService, ExamData);

        this._userCourseBridgeService = userCourseBridgeService;
        this._userSessionActivityService = userSessionActivityService;
        this._quesitonAnswerService = quesitonAnswerService;
        this._questionsService = questionsService;

    }

    /**
     * Creates a new exam
     */
    async createExamAsync(exam: ExamData) {

        await this._ormService
            .createAsync(ExamData, exam);
    }

    /**
     * Returns an exam player dto that contains 
     * all the data necessary to play an exam.
     */
    getExamPlayerDTOAsync = async (userId: Id<'User'>, examId: Id<'Exam'>) => {

        const examView = await this._ormService
            .query(ExamPlayerDataView, { examId, userId })
            .where('examId', '=', 'examId')
            .and('userId', '=', 'userId')
            .getSingle();

        const questions = await this
            ._getQuestionDataByExamVersionId(examView.examVersionId);

        if (questions.length === 0)
            throw new Error('Exam has no questions assigend.');

        return this._mapperService
            .mapTo(ExamPlayerDataDTO, [examView, questions]);
    };

    /**
     * Get questions for a particular exam.
     */
    private async _getQuestionDataByExamVersionId(examVersionId: Id<'ExamVersion'>) {

        const questionData = await this._ormService
            .query(QuestionDataView, { examVersionId: examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .getMany();

        return questionData;
    }

    /**
     * Sets the start date of the answer session, so it can be tracked once finished.
     */
    async startExamAsync(answerSessionId: Id<'AnswerSession'>) {

        await this._ormService
            .save(AnswerSession, {
                id: answerSessionId,
                startDate: new Date()
            });
    }

    /**
     * Returns the exam by it's id.
     */
    getExamByIdAsync = (examId: Id<'Exam'>) => {

        return this._ormService
            .getSingleById(ExamVersionView, examId);
    };

    /**
     * Answer a question in the exam. 
     */
    answerExamQuestionAsync = async (principalId: PrincipalId, dto: AnswerQuestionDTO) => {

        //throwNotImplemented();
        //TODO validation comes here

        const userIdAsIdType = Id.create<'User'>(principalId.toSQLValue());

        const { answerSessionId, answerIds, elapsedSeconds, questionVersionId } = dto;

        // inspect questions
        const questions = await this._ormService
            .withResType<QuestionVersion>()
            .query(QuestionVersion, { answerSessionId })
            .select(AnswerSession)
            .leftJoin(QuestionData, x => x
                .on('id', '=', 'questionDataId', QuestionVersion))
            .leftJoin(ExamVersion, x => x
                .on('id', '=', 'examVersionId', QuestionVersion))
            .leftJoin(AnswerSession, x => x
                .on('examVersionId', '=', 'id', ExamVersion))
            .where('id', '=', 'answerSessionId')
            .getMany();
        /* .getRepository(QuestionVersion)
        .createQueryBuilder('qv')
        .withDeleted()
        .leftJoinAndSelect('qv.questionData', 'qd')
        .leftJoinAndSelect('qv.examVersion', 'ev')
        .leftJoinAndSelect('ev.answerSessions', 'as')
        .where('as.id = :asid', { asid: answerSessionId })
        .orderBy('qd.orderIndex')
        .getMany(); */

        const isLast = questions[questions.length - 1].id === questionVersionId;
        const examVersionId = questions.first().examVersionId!;

        // save user activity
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userIdAsIdType, 'exam', examVersionId);

        // save answer 
        const result = this._quesitonAnswerService
            .answerQuestionAsync(
                userIdAsIdType,
                answerSessionId,
                questionVersionId,
                answerIds,
                true,
                elapsedSeconds);

        if (!isLast)
            return result;

        // set answer session end date 
        await this._ormService
            .save(AnswerSession, {
                id: answerSessionId,
                endDate: new Date()
            });

        // set user exam progress
        const answerSessionViews = await this._ormService
            .query(AnswerSessionView, { userId: userIdAsIdType, examVersionId })
            .where('userId', '=', 'userId')
            .and('examVersionId', '=', 'examVersionId')
            .getMany();

        const currentAnswerSessionIsSuccessful = answerSessionViews
            .first(x => x.answerSessionId == answerSessionId);

        const successfulAsvCount = answerSessionViews
            .count(x => x.isSuccessful);

        const currentIsFirstSuccessfulAse = successfulAsvCount === 1 && currentAnswerSessionIsSuccessful;

        // if not first successful ase return
        if (!currentIsFirstSuccessfulAse)
            return result;

        //if first successful ase, save user exam progress bridge
        throwNotImplemented();
        /*  await this._ormService
             .save(UserExamProgressBridge, {
                 id: currentAnswerSessionIsSuccessful.answerSessionId,
                 completionDate: new Date(),
                 examVersionId,
                 userId: userIdAsIdType
             }); */
    };

    /**
     * Get the results of the particular exam.
     */
    getExamResultsAsync = async (userId: PrincipalId, answerSessionId: Id<'AnswerSession'>) => {

        const userIdAsIdType = Id.create<'User'>(userId.toSQLValue());

        const currentItemCode = await this._userCourseBridgeService
            .getCurrentItemCodeOrFailAsync(userIdAsIdType);

        const { itemId, itemType } = readItemCode(currentItemCode);

        if (itemType !== 'exam')
            throw new Error('Current item is not an exam!');

        const latestExam = await this._ormService
            .query(LatestExamView, { examId: itemId })
            .where('examId', '=', 'examId')
            .getSingle();

        const latestExamVersionId = latestExam.examVersionId;

        const examResultViews = await this._ormService
            .query(ExamResultView, {
                examVersionId: latestExamVersionId,
                userId: userIdAsIdType,
                answerSessionId
            })
            .where('examVersionId', '=', 'examVersionId')
            .and('userId', '=', 'userId')
            .and('answerSessionId', '=', 'answerSessionId')
            .getMany();

        return toExamResultDTO(examResultViews);
    };
}