import { Flex } from '@chakra-ui/react';
import { memo, ReactNode, useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useAdminCourseList } from '../../../services/api/courseApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoFont } from '../../controls/EpistoFont';
import { AdminBreadcrumbsHeader, BreadcrumbLink } from '../AdminBreadcrumbsHeader';
import { AdminCourseList } from './AdminCourseList';

export const CourseAdministartionFrame = (params: {
    children?: ReactNode,
    isAnySelected: boolean
}) => {

    const { children, isAnySelected } = params;

    // util
    const { navigate } = useNavigation();
    const courseId = useIntParam('courseId');
    const isMatchingCurrentUrl = useIsMatchingCurrentRoute();

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList('');

    // dt
    const currentCourse = courses
        .firstOrNull(x => x.courseId === courseId);

    // func
    const navigationFunction = useCallback((courseId: number) => {

        const url = (() => {

            const base = applicationRoutes.administrationRoute.coursesRoute;

            if (isMatchingCurrentUrl(base.courseDetailsRoute).isMatchingRoute)
                return base.courseDetailsRoute;

            if (isMatchingCurrentUrl(base.courseContentRoute).isMatchingRoute)
                return base.courseContentRoute;

            return base.statisticsCourseRoute;
        })();

        navigate(url, { courseId });
    }, [courseId, navigate, isMatchingCurrentUrl, applicationRoutes]);

    return (
        <Flex
            id="CourseAdministartionFrame"
            className="whall">

            {/* header */}
            <AdminBreadcrumbsHeader>

                {/* breadcrumbDatas={[
                    // <BreadcrumbLink
                    //     key={1}
                    //     title="Kurzusok"
                    //     iconComponent={applicationRoutes.administrationRoute.coursesRoute.icon} />,
                    // currentCourse && <BreadcrumbLink
                    //     key={2}
                    //     title={currentCourse?.title + ''}
                    //     isCurrent />
                ]} */}

                {/* course list */}
                <AdminCourseList
                    onCourseClick={navigationFunction}
                    courses={courses} />

                {/* content pane */}
                {isAnySelected
                    ? children
                    : <Flex
                        justify="center"
                        className="whall"
                        bg="white">

                        <EpistoFont
                            style={{
                                marginTop: '50px'
                            }}>
                            Kérlek válassz ki egy kurzust
                        </EpistoFont>
                    </Flex>}

            </AdminBreadcrumbsHeader>
        </Flex>
    );
};