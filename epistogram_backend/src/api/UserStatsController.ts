import { UserStatsService } from '../services/UserStatsService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class UserStatsController {

    private _userStatsService: UserStatsService;

    constructor(serviceProvider: ServiceProvider) {

        this._userStatsService = serviceProvider.getService(UserStatsService);
    }

    @XControllerAction(apiRoutes.userStats.getHomePageStats)
    getHomePageStatsAction = async (params: ActionParams) => {

        return await this._userStatsService
            .getHomePageStatsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userStats.getUserLearningPageStats)
    getUserLearningPageStatsAction = async (params: ActionParams) => {

        return await this._userStatsService
            .getUserLearningPageStatsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userStats.getUserCourseStats)
    getUserCourseStatsAction = async (params: ActionParams) => {

        const userId = params
            .getQuery<{ userId: number }>()
            .getValue(x => x.userId, 'int');

        return await this._userStatsService
            .getUserCourseStatsAsync(userId);
    };

    @XControllerAction(apiRoutes.userStats.getUserVideoStats)
    getUserVideoStatsAction = async (params: ActionParams) => {

        const query = params
            .getQuery<{ userId: number, courseId: number }>()

        const userId = query
            .getValue(x => x.userId, 'int');

        const courseId = query
            .getValue(x => x.courseId, 'int')

        return await this._userStatsService
            .getUserVideoStatsAsync(userId, courseId);
    };

    @XControllerAction(apiRoutes.userStats.getUserExamStats)
    getUserExamStatsAction = async (params: ActionParams) => {

        const query = params
            .getQuery<{ userId: number, courseId: number }>()

        const userId = query
            .getValue(x => x.userId, 'int');

        const courseId = query
            .getValue(x => x.courseId, 'int')

        return await this._userStatsService
            .getUserExamStatsAsync(userId, courseId);
    };

    @XControllerAction(apiRoutes.userStats.getUserLearningOverviewData)
    getUserLearningOverviewDataAction = async (params: ActionParams) => {
        const query = params
            .getQuery<any>();

        const userId = query
            .getValue(x => x.userId, 'int');

        return this._userStatsService
            .getUserLearningOverviewDataAsync(userId);
    };
}