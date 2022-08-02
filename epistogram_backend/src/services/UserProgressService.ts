import { UserActiveCourseView } from '../models/views/UserActiveCourseView';
import { UserDailyCourseItemProgressView } from '../models/views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from '../models/views/UserWeeklyCourseItemProgressView';
import { RecomendedItemQuotaDTO } from '../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../shared/dtos/UserCourseProgressChartDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { EpistoLineChartDataType } from '../shared/types/epistoChartTypes';
import { Id } from '../shared/types/versionId';
import { dateDiffInDays, forN } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserProgressService extends ServiceBase {

    private _tempomatService: TempomatService;
    private _authorizationService: AuthorizationService;

    constructor(
        mapperService: MapperService,
        ormservice: ORMConnectionService,
        tempomatService: TempomatService,
        authorizationService: AuthorizationService
    ) {

        super(mapperService, ormservice);

        this._tempomatService = tempomatService;
        this._authorizationService = authorizationService;
    }

    getActiveCoursesAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                const views = await this._ormService
                    .query(UserActiveCourseView, { userId })
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService
                    .mapTo(UserActiveCourseDTO, [views]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    getRecommendedItemQuotaAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        return {
            action: async () => {
                const userId = principalId.getId();

                const tempomatData = await this
                    ._tempomatService
                    .calculateTempomatValuesAsync(userId, courseId);

                const requiredCompletionDate = tempomatData?.requiredCompletionDate || null;
                const previsionedCompletionDate = tempomatData?.previsionedCompletionDate || null;
                const recommendedItemsPerDay = tempomatData?.recommendedItemsPerDay || null;

                const currentDailyCompletedView = await this._ormService
                    .query(UserDailyCourseItemProgressView, { userId, courseId })
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .and('isCurrent', 'IS', 'true')
                    .getOneOrNull();

                const getCurrentWeeklyCompletedView = await this._ormService
                    .query(UserWeeklyCourseItemProgressView, { userId, courseId })
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .and('isCurrent', 'IS', 'true')
                    .getOneOrNull();

                return instantiate<RecomendedItemQuotaDTO>({
                    isDeadlineSet: !!requiredCompletionDate,
                    previsionedCompletionDate: previsionedCompletionDate,
                    recommendedItemsPerDay: recommendedItemsPerDay ?? 0,
                    recommendedItemsPerWeek: recommendedItemsPerDay ? recommendedItemsPerDay * 7 : 0,
                    completedThisWeek: getCurrentWeeklyCompletedView?.completedItemCount ?? 0,
                    completedToday: currentDailyCompletedView?.completedItemCount ?? 0
                });
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };


    }

    getProgressChartDataAsync(principalId: PrincipalId, courseId: Id<'Course'>): ControllerActionReturnType {

        return {
            action: async (): Promise<UserCourseProgressChartDTO | 'NO DATA'> => {

                const userId = principalId.getId();

                const tempomatData = await this
                    ._tempomatService
                    .calculateTempomatValuesAsync(userId, courseId);

                const originalPrevisionedCompletionDate = tempomatData?.originalPrevisionedCompletionDate || null;
                const previsionedCompletionDate = tempomatData?.previsionedCompletionDate || null;
                const startDate = tempomatData?.startDate || null;

                const estimatedLengthInDays = (previsionedCompletionDate && startDate)
                    ? dateDiffInDays(startDate, previsionedCompletionDate)
                    : null;

                const originalEstimatedLengthInDays = (originalPrevisionedCompletionDate && startDate)
                    ? dateDiffInDays(startDate, originalPrevisionedCompletionDate)
                    : null;

                const dailyViews = await this._ormService
                    .query(UserDailyCourseItemProgressView, { userId, courseId })
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .getMany();

                const estimatedLengthInDaysOrNull = estimatedLengthInDays
                    ? estimatedLengthInDays + 1
                    : null;

                const originalEstimatedLengthInDaysOrNull = originalEstimatedLengthInDays
                    ? originalEstimatedLengthInDays + 1
                    : null;

                if (!estimatedLengthInDaysOrNull)
                    throw new Error('Couldn\'t estimate course length');

                if (!originalEstimatedLengthInDaysOrNull)
                    throw new Error('Couldn\'t estimate course length');

                const estimatedDates = forN(estimatedLengthInDaysOrNull, index => {

                    if (!startDate)
                        return '';

                    const date = new Date(startDate)
                        .addDays(index);

                    return date.toLocaleDateString(undefined, {
                        month: '2-digit',
                        day: '2-digit'
                    });
                });

                const originalEstimatedDates = forN(originalEstimatedLengthInDaysOrNull, index => {

                    if (!startDate)
                        return null;

                    const date = new Date(startDate)
                        .addDays(index);

                    return date.toLocaleDateString(undefined, {
                        month: '2-digit',
                        day: '2-digit'
                    });
                });


                const daysFromStart = startDate
                    ? dateDiffInDays(new Date(startDate), new Date(Date.now()))
                    : null;

                const datesUntilToday = daysFromStart
                    ? forN(daysFromStart, index => index)
                    : null;

                const previsionedProgress = estimatedDates
                    .map((_, index) => (100 / estimatedDates.length) * (index + 1)) as EpistoLineChartDataType;

                const originalPrevisionedProgress = originalEstimatedDates
                    .map((_, index) => (100 / originalEstimatedDates.length) * (index + 1)) as EpistoLineChartDataType;

                let latestCompletionDatePercentage = 0;

                const actualProgress = datesUntilToday
                    ? datesUntilToday.map((_, index) => {

                        const up = dailyViews.find(x => x.offsetDaysFromStart === index + 1)?.completedPercentage || 0;

                        if (latestCompletionDatePercentage <= up) {

                            latestCompletionDatePercentage += up;
                            return up;
                        } else {
                            return latestCompletionDatePercentage;
                        }
                    })
                    : [];

                const interval = Math.floor(estimatedDates.length / 7);

                return instantiate<UserCourseProgressChartDTO>({
                    dates: estimatedDates,
                    originalPrevisionedProgress: originalPrevisionedProgress,
                    previsionedProgress: previsionedProgress,
                    actualProgress: actualProgress
                });
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }
}