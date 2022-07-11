import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useEditUserData } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { useIntParam } from '../../../static/locationHelpers';
import { } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminUserList } from './AdminUserList';
import { AdminUserCoursesDataGridControl } from './dataGrids/AdminUserCoursesDataGridControl';
import { AdminUserCourseContentDialog } from './modals/AdminUserCourseContentDialog';

export const AdminUserCourseContentSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;

    const userId = useIntParam('userId')!;

    const { userEditData } = useEditUserData(userId);
    const { setRequiredCourseCompletionDateAsync, setRequiredCourseCompletionDateState } = CourseApiService.useSetRequiredCompletionDate();

    const dialogLogic = useEpistoDialogLogic<{ courseId: number | null }>('sasd');

    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    const handleSaveRequiredCompletionDate = (courseId: number | null, requiredCompletionDate: Date | null) => {

        if (!courseId || !requiredCompletionDate)
            showError('Hiba történt');

        console.log(requiredCompletionDate!.toISOString());

        setRequiredCourseCompletionDateAsync({
            courseId: courseId!,
            requiredCourseCompletionDate: requiredCompletionDate!.toISOString()
        });


    };

    return <AdminBreadcrumbsHeader>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.courseContentRoute, { userId: userId });
            }} />

        <AdminSubpageHeader
            direction="row"
            tabMenuItems={
                [
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.courseContentRoute
                ]
                    .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

            <AdminUserCourseContentDialog dialogLogic={dialogLogic} />

            <AdminUserCoursesDataGridControl
                handleMoreButton={
                    (courseId: number | null) => dialogLogic.openDialog({ params: { courseId: courseId } })
                }
                handleSaveRequiredCompletionDate={handleSaveRequiredCompletionDate} />
        </AdminSubpageHeader >
    </AdminBreadcrumbsHeader >;
};