import { Id } from '@episto/commontypes';
import { ReactNode, useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification } from '../../../services/core/notifications';
import { setPageTitle, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { useAdminBreadcrumbsContext } from '../breadcrumbsHeader/AdminBreadcrumbsContext';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
import { AdminCourseList } from './AdminCourseList';

export const CourseAdministartionFrame = ({
    children,
    isAnySelected,
    noHeightOverflow,
    disabled
}: {
    children?: ReactNode,
    isAnySelected: boolean,
    noHeightOverflow?: boolean,
    disabled?: boolean
}) => {

    const { activeCompany, activeCompanyId } = useAdminBreadcrumbsContext();

    // util
    const { navigate3 } = useNavigation();
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);
    const isMatchingCurrentUrl = useIsMatchingCurrentRoute();

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = CourseApiService.useAdminCourseList('');

    // dt
    const currentCourse = courses
        .firstOrNull(x => x.courseId === courseId);

    if (currentCourse)
        setPageTitle(`Kurzus szerkesztese - ${currentCourse.title}`);

    // func
    const navToCourse = useCallback((courseId: Id<'Course'>) => {

        const route = (() => {

            const base = applicationRoutes.administrationRoute.coursesRoute;

            if (isMatchingCurrentUrl(base.statisticsCourseRoute).isMatchingRoute)
                return base.statisticsCourseRoute;

            if (isMatchingCurrentUrl(base.courseContentRoute).isMatchingRoute)
                return base.courseContentRoute;

            return base.courseDetailsRoute;
        })();

        navigate3(route, { params: { activeCompanyId, courseId } });
    }, [navigate3, isMatchingCurrentUrl, activeCompanyId]);

    const { createCourseAsync, createCourseState } = CourseApiService
        .useCreateCourse();

    const handleCreateCourse = useCallback(async () => {

        await createCourseAsync({
            title: 'New course'
        });
        showNotification('Created successfully');
        await refetchCoursesAsync();
    }, [createCourseAsync, refetchCoursesAsync]);

    return (
        <EpistoFlex2
            id={CourseAdministartionFrame.name}
            flex="1"
            overflowY="scroll">

            {/* header */}
            <AdminBreadcrumbsHeader
                disabled={disabled}
                subRouteLabel={currentCourse?.title ?? ''}>

                <EpistoButton
                    onClick={handleCreateCourse}>

                    Kurzus hozzáadása
                </EpistoButton>
            </AdminBreadcrumbsHeader>

            {/* course list */}
            <AdminCourseList
                noOverflow={noHeightOverflow}
                onCourseClick={navToCourse}
                courses={courses} />

            {/* content pane */}
            {isAnySelected
                ? children
                : <EpistoFlex2
                    justify="center"
                    className="whall"
                    bg="white">

                    <EpistoFont
                        style={{
                            marginTop: '50px'
                        }}>
                        Kérlek válassz ki egy kurzust
                    </EpistoFont>
                </EpistoFlex2>}
        </EpistoFlex2>
    );
};