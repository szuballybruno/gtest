import { AnswerSession } from '../models/entity/AnswerSession';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { PractiseQuestionDTO } from '../shared/dtos/PractiseQuestionDTO';
import { PractiseQuestionView } from '../models/views/PractiseQuestionView';
import { PlayerService } from './PlayerService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { ServiceBase } from './misc/ServiceBase';
import { MapperService } from './MapperService';
import { PrincipalId } from '../utilities/ActionParams';
import { User } from '../models/entity/User';
import { Id } from '../shared/types/versionId';

export class PractiseQuestionService extends ServiceBase {

    private _questionAnswerService: QuestionAnswerService;
    private _playerService: PlayerService;

    constructor(
        ormConnection: ORMConnectionService,
        questionAnswerService: QuestionAnswerService,
        playerService: PlayerService,
        mapperService: MapperService) {

        super(mapperService, ormConnection);

        this._questionAnswerService = questionAnswerService;
        this._playerService = playerService;
    }

    getPractiseQuestionAsync = async (principalId: PrincipalId) => {

        const userId = principalId.toSQLValue();

        const questionViews = await this._ormService
            .query(PractiseQuestionView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        if (!questionViews.any())
            return null;

        const questionGroup = questionViews
            .groupBy(x => x.questionVersionId)
            .first();

        const viewAsQuesiton = questionGroup.items.first();

        const questionDTO = {
            questionVersionId: viewAsQuesiton.questionVersionId,
            questionText: viewAsQuesiton.questionText,
            typeId: viewAsQuesiton.questionTypeId,
            answers: questionGroup
                .items
                .map(x => ({
                    answerId: x.answerId,
                    answerText: x.answerText
                }))
        } as PractiseQuestionDTO;

        return questionDTO;
    };

    answerPractiseQuestionAsync = async (principalId: PrincipalId, qu: AnswerQuestionDTO) => {

        const userIdAsIdType = Id.create<User>(principalId.toSQLValue());

        const practiseAnswerSession = await this.getUserPractiseAnswerSession(userIdAsIdType);

        return await this._questionAnswerService
            .answerQuestionAsync(userIdAsIdType, practiseAnswerSession.id, qu.questionVersionId, qu.answerIds, false, 0, true);
    };

    getUserPractiseAnswerSession = async (userId: Id<User>) => {

        return this._ormService
            .query(AnswerSession, { userId })
            .where('isPractise', '=', 'true')
            .and('userId', '=', 'userId')
            .getSingle();
    };
}