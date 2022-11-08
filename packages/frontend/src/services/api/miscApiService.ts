import { applicationRoutes } from '../../configuration/applicationRoutes';
import { CourseOverviewDataDTO } from '@episto/communication';
import { OverviewPageDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { GlobalEventManagerType } from '../../static/EventBus';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { QueryService } from '../../static/QueryService';

export const useCourseOverviewData = (userId?: Id<'User'>, courseId?: Id<'Course'>) => {

    const qr = QueryService.useXQuery<CourseOverviewDataDTO>(apiRoutes.misc.getCourseOverviewData, { userId, courseId });

    return {
        courseOverviewData: qr.data
    };
};

export const useOverviewPageDTO = () => {

    const queryRes = QueryService.useXQuery<OverviewPageDTO>(apiRoutes.misc.getHomePageDTO);

    return {
        pageDTO: queryRes.data,
        status: queryRes.state,
        error: queryRes.error
    };
};

export const useMiscApiService = (globalEventManager: GlobalEventManagerType) => {

    const useCurrentCourseItemCode = () => {

        const currentRoute = useGetCurrentAppRoute();
        const isEnabled = !currentRoute.isUnauthorized;
        const qr = QueryService.useXQuery<string>(apiRoutes.misc.getCurrentCourseItemCode, undefined, isEnabled);

        return {
            refetchCurrentCourseItemCode: qr.refetch,
            currentCourseItemCode: qr.data
        };
    };

    const useActivationCodeLinks = (companyId: Id<'Company'>) => {

        const regViaActivationCodeRoute = applicationRoutes
            .registerViaActivationCodeRoute;

        const tokens = {
            code: '%CODE%',
            domain: '%DOMAIN%'
        };

        const query: typeof regViaActivationCodeRoute.queryType = { activationCode: tokens.code };

        const queryKey = Object
            .keys(query)
            .single();

        const path = regViaActivationCodeRoute
            .route
            .getAbsolutePath();

        const urlTemplate = `${tokens.domain}${path}?${queryKey}=${query[queryKey]}`;

        const qr = QueryService
            .useXQueryArrayParametrized(String, apiRoutes.misc.getActivationCodeLinks, { companyId, urlTemplate });

        return {
            activationCodeLinks: qr.data,
            activationCodeLinksState: qr.state,
            activationCodeLinksError: qr.error,
        };
    };

    return {
        useCurrentCourseItemCode,
        useActivationCodeLinks
    };
};

export type MiscApiService = ReturnType<typeof useMiscApiService>;