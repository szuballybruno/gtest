import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { CourseService } from '../services/CourseService';
import { PlayerService } from '../services/PlayerService';
import { VideoService } from '../services/VideoService';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';

export class PlayerController {

    private _courseService: CourseService;
    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseService = serviceProvider.getService(CourseService);
        this._playerService = serviceProvider.getService(PlayerService);
        this._videoService = serviceProvider.getService(VideoService);
    }

    @XControllerAction(apiRoutes.player.answerVideoQuestion, { isPost: true })
    answerVideoQuestionAction = async (params: ActionParams) => {

        const dto = params.getBody<AnswerQuestionDTO>();
        const answerIds = dto.getValue(x => x.answerIds, 'int[]');
        const questionVersionId = dto.getValue(x => x.questionVersionId, 'int');
        const answerSessionId = dto.getValue(x => x.answerSessionId, 'int');
        const elapsedSeconds = dto.getValue(x => x.elapsedSeconds, 'float');

        return this._videoService
            .answerVideoQuestionAsync(params.principalId, answerSessionId, questionVersionId, answerIds, elapsedSeconds);
    };

    @XControllerAction(apiRoutes.player.getPlayerData)
    getPlayerDataAction = (params: ActionParams) => {

        const descriptorCode = params
            .getQuery()
            .getValue(x => x.descriptorCode, 'string');

        return this._playerService.getPlayerDataAsync(params.principalId, descriptorCode);
    };
}