import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { CourseService } from '../services/CourseService';
import { PlayerService } from '../services/PlayerService';
import { VideoService } from '../services/VideoService';
import { ActionParams } from '../utilities/ActionParams';

export class PlayerController {

    private _courseService: CourseService;
    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(courseService: CourseService, playerService: PlayerService, videoService: VideoService) {

        this._courseService = courseService;
        this._playerService = playerService;
        this._videoService = videoService;
    }

    answerVideoQuestionAction = async (params: ActionParams) => {

        const dto = params.getBody<AnswerQuestionDTO>();
        const answerIds = dto.getValue(x => x.answerIds, 'int[]');
        const questionId = dto.getValue(x => x.questionId, 'int');
        const answerSessionId = dto.getValue(x => x.answerSessionId, 'int');
        const elapsedSeconds = dto.getValue(x => x.elapsedSeconds, 'float');

        return this._videoService
            .answerVideoQuestionAsync(params.currentUserId, answerSessionId, questionId, answerIds, elapsedSeconds);
    };

    getPlayerDataAction = (params: ActionParams) => {

        const descriptorCode = params
            .getQuery()
            .getValue(x => x.descriptorCode, 'string');

        return this._playerService.getPlayerDataAsync(params.currentUserId, descriptorCode);
    };

    getCourseItemsAction = async (params: ActionParams) => {

        return this._courseService
            .getCurrentCourseModulesAsync(params.currentUserId);
    };
}