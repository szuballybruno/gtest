import { Add } from '@mui/icons-material';
import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ButtonType } from '../../../models/types';
import { UserApiService } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { UserEditReadDTO } from '../../../shared/dtos/UserEditReadDTO';
import { UserEditSaveDTO } from '../../../shared/dtos/UserEditSaveDTO';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, useSubscribeEventTrigger } from '../../../static/frontendHelpers';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { AdminBreadcrumbsHeader, CompanySelectorDropdown } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';
import { AdminUserList } from './AdminUserList';


export const AdminEditUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void,
    selectedCompanyId: Id<'Company'> | null,
    handleSelectCompany: (companyId: Id<'Company'> | null) => void,
    companies: CompanyDTO[]
}) => {

    const { users, refetchUsersFunction, selectedCompanyId, handleSelectCompany, companies } = props;

    const editedUserId = useRouteParams(applicationRoutes.administrationRoute.usersRoute.editRoute)
        .getValueOrNull(x => x.userId, 'int');

    const { userEditData, refetchEditUserData } = UserApiService.useEditUserData(editedUserId);
    const { saveUserAsync } = UserApiService.useSaveUser();
    const showError = useShowErrorDialog();
    const { navigate2 } = useNavigation();
    const navigateToAddUser = () => navigate2(applicationRoutes.administrationRoute.usersRoute.addRoute);
    const refetchTrigger = useEventTrigger();


    /**
     * Select first user if none selected
     */
    useEffect(() => {

        if (!editedUserId && users.length > 0)
            return navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: users.first().id });
    }, [editedUserId, users]);

    const handleSaveUserAsync = async (dto: UserEditSaveDTO) => {

        try {

            await saveUserAsync(dto);
            showNotification('A változtatások sikeresen mentésre kerültek.');
            refetchTrigger.fireEvent();
        }
        catch (e) {

            showError(e);
        }
    };

    // subscribe refetch trigger
    useSubscribeEventTrigger(refetchTrigger, refetchEditUserData);

    const deleteWaningDialogLogic = useEpistoDialogLogic('delwarn');

    const showDeleteUserDialog = (user: UserEditReadDTO | null) => {

        if (!user)
            return;

        deleteWaningDialogLogic
            .openDialog({
                title: 'Biztosan törlöd a felhasználót?',
                description: `${user.lastName} ${user.firstName} nevű felhasználó visszavonhatatlanul törölve lesz!`,
                buttons: [
                    {
                        title: 'Törlés',
                        action: async () => {

                            try {

                                await UserApiService.deleteUserAsync(user.userId);
                                await refetchUsersFunction();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    };

    const bulkEditButtons = [
        {
            title: 'Felhasználó hozzáadása',
            icon: <Add
                style={{
                    margin: '0 3px 0 0',
                    padding: '0 0 1px 0'
                }} />,
            action: () => {
                navigateToAddUser();
            }
        }
    ] as ButtonType[];

    const checkIfCurrentUserFromUrl = () => {
        const isUserFound = users.some(user => user.id === editedUserId);

        if (!isUserFound && users[0]) {
            navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: users[0].id });
        }
    };
    checkIfCurrentUserFromUrl();


    return <AdminBreadcrumbsHeader
        headerComponent={companies.length > 1 && <CompanySelectorDropdown
            selectedCompanyId={selectedCompanyId}
            handleSelectCompany={handleSelectCompany}
            companies={companies} />}
        viewSwitchChecked={false}
        viewSwitchFunction={() =>
            navigate2(applicationRoutes.administrationRoute.usersRoute, { preset: 'all' })
        }>

        <AdminUserList
            currentUserId={editedUserId}
            users={users}
            onUserSelected={(userId) => {
                navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: userId });
            }} />

        <AdminSubpageHeader
            direction="row"
            headerButtons={bulkEditButtons}
            tabMenuItems={
                [
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.courseContentRoute
                ]
                    .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

            <EpistoDialog logic={deleteWaningDialogLogic} />

            {editedUserId && <AdminEditUserControl
                editedUserId={editedUserId}
                refetchTrigger={refetchTrigger}
                editDTO={userEditData}
                showDeleteUserDialog={showDeleteUserDialog}
                saveUserAsync={handleSaveUserAsync} />}
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader >;
};

export default AdminEditUserSubpage;
