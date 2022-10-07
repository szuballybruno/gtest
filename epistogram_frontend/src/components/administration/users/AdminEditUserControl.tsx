import { Checkbox } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useCoinBalanceOfUser, useGiftCoinsToUser } from '../../../services/api/coinTransactionsApiService';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { useJobTitles } from '../../../services/api/miscApiService';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { ChangeSet } from '../../../shared/dtos/changeSet/ChangeSet';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { DepartmentDTO } from '../../../shared/dtos/DepartmentDTO';
import { UserPermissionDTO } from '../../../shared/dtos/role/UserPermissionDTO';
import { UserRoleDTO } from '../../../shared/dtos/role/UserRoleDTO';
import { UserEditDTO } from '../../../shared/dtos/UserEditSaveDTO';
import { Id } from '../../../shared/types/versionId';
import { EventTriggerType, parseIntOrNull } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { useAuthorizationContext } from '../../system/AuthorizationContext';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';
import { EditSection } from '../courses/EditSection';
import { TailingAdminButtons } from '../TailingAdminButtons';

export const AdminEditUserControl = ({
    editDTO,
    editedUserId,
    refetchTrigger,
    saveUserAsync,
    showDeleteUserDialog
}: {
    editedUserId: Id<'User'>,
    editDTO: UserEditDTO | null,
    refetchTrigger: EventTriggerType,
    saveUserAsync: (editDTO: UserEditDTO) => Promise<void>
    showDeleteUserDialog?: (UserEditDTO: UserEditDTO | null) => void
}) => {

    const { hasPermission } = useAuthorizationContext();
    const mode = (editedUserId as any) < 0 ? 'ADD' : 'EDIT';

    // editable fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedJobTitle, setSelectedJobTitle] = useState<DepartmentDTO | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [rolesChangeSet, setRolesChangeSet] = useState<ChangeSet<UserRoleDTO>>(new ChangeSet<UserRoleDTO>());
    const [permissionsChangeSet, setPermissionsChangeSet] = useState<ChangeSet<UserPermissionDTO>>(new ChangeSet<UserPermissionDTO>());
    const { canSetUserRole } = editDTO ?? { canSetUserRole: false };

    const showError = useShowErrorDialog();

    const canSetInvitedUserCompany = true;//hasPermission('i');

    const { coinBalance, coinBalanceStatus, coinBalanceError, refetchCoinBalance } = useCoinBalanceOfUser(mode === 'EDIT' ? editedUserId : null);
    const { giftCoinsToUserAsync, giftCoinsToUserState } = useGiftCoinsToUser();
    const { roleAssignCompanies, roleAssignCompaniesError, roleAssignCompaniesState } = CompanyApiService.useRoleAssignCompanies();
    const { jobTitles, jobTitlesError, jobTitlesStatus } = useJobTitles();

    useSetBusy(useCoinBalanceOfUser, coinBalanceStatus, coinBalanceError);
    useSetBusy(CompanyApiService.useRoleAssignCompanies, roleAssignCompaniesState, roleAssignCompaniesError);
    useSetBusy(useJobTitles, jobTitlesStatus, jobTitlesError);

    useEffect(() => {

        if (!editDTO)
            return;

        setFirstName(editDTO.firstName);
        setLastName(editDTO.lastName);
        setEmail(editDTO.email);
        setIsTeacher(editDTO.isTeacher);

        if (jobTitles.length === 0 || roleAssignCompanies.length === 0)
            return;

        const comp = roleAssignCompanies
            .single(x => x.id === editDTO.companyId);

        const jt = jobTitles
            .single(x => x.id === editDTO.jobTitleId);

        setSelectedJobTitle(jt);
        setSelectedCompany(comp);


    }, [editDTO, jobTitles, roleAssignCompanies]);

    const coinAmountEntryState = useEpistoEntryState({
        isMandatory: true,
        validateFunction: (value) => {

            if (value === '0')
                return 'Nem adhatsz hozzá \'0\' coin-t.';

            if (!parseIntOrNull(value))
                return 'Helytelen formátum';

            return null;
        }
    });

    const handleAddCoinsAsync = async () => {

        try {

            if (!coinAmountEntryState.validate() || mode === 'ADD')
                return;

            const amount = parseInt(coinAmountEntryState.value);

            await giftCoinsToUserAsync({ userId: editedUserId, amount });
            showNotification(`Sikeresen hozzáadtál ${amount} Coint.`);
            await refetchCoinBalance();
        }
        catch (e) {

            showError(e);
        }
    };

    const handleSaveUserAsync = async () => {

        if (!selectedCompany || !selectedJobTitle)
            return;

        const editedUserDTO: UserEditDTO = {
            id: editedUserId,
            firstName,
            lastName,
            email,
            companyId: selectedCompany.id,
            jobTitleId: selectedJobTitle.id,
            isTeacher,
            permissions: permissionsChangeSet,
            roles: rolesChangeSet,
            canSetUserRole
        };

        return saveUserAsync(editedUserDTO);
    };

    const onAuthItemsChanged = useCallback((data: {
        assignedRoles?: ChangeSet<UserRoleDTO>,
        assignedPermissions?: ChangeSet<UserPermissionDTO>
    }) => {

        if (data.assignedRoles)
            setRolesChangeSet(data.assignedRoles);

        if (data.assignedPermissions)
            setPermissionsChangeSet(data.assignedPermissions);
    }, [setRolesChangeSet, setPermissionsChangeSet]);

    return <EpistoFlex2 direction="column"
        flex="1">

        {/* left column */}
        <EpistoFlex2 direction="column"
            flex="1">

            {/* basic info section */}
            <EditSection
                title="Alapadatok">

                {/* first & last name */}
                <EpistoFlex2 flex="1"
                    justify="space-between">

                    <EpistoEntry
                        style={{
                            flex: 1,
                            marginRight: 5
                        }}
                        name="lname"
                        value={lastName}
                        setValue={setLastName}
                        labelVariant={'top'}
                        label={translatableTexts.misc.lastName} />

                    <EpistoEntry
                        style={{
                            flex: 1
                        }}
                        value={firstName}
                        name="fname"
                        setValue={setFirstName}
                        labelVariant={'top'}
                        label={translatableTexts.misc.firstName} />
                </EpistoFlex2>

                {/* email */}
                <EpistoEntry
                    name="email"
                    value={email}
                    setValue={setEmail}
                    labelVariant={'top'}
                    label="Email" />
            </EditSection>

            {/* company section */}
            <EditSection title="Cég és jogosultságkezelés">

                {/* company */}
                {canSetInvitedUserCompany && <EpistoFlex2
                    direction="column"
                    align="stretch"
                    mt="5px"
                    width="100%">

                    <EpistoFont
                        isUppercase
                        fontSize="fontExtraSmall"
                        style={{
                            marginTop: '10px',
                            letterSpacing: '1.2px'
                        }}>

                        {translatableTexts.misc.company}
                    </EpistoFont>

                    <EpistoSelect
                        items={roleAssignCompanies}
                        selectedValue={selectedCompany}
                        onSelected={setSelectedCompany}
                        getDisplayValue={x => '' + x?.name}
                        getCompareKey={company => '' + company?.id} />
                </EpistoFlex2>}

                {/* role */}
                {canSetUserRole && <EpistoFlex2
                    direction="column"
                    align="stretch"
                    mt="5px"
                    width="100%">

                    <EpistoFont
                        isUppercase
                        fontSize="fontExtraSmall"
                        style={{
                            marginTop: '10px',
                            letterSpacing: '1.2px'
                        }}>

                        {translatableTexts.misc.company}
                    </EpistoFont>

                    {}
                </EpistoFlex2>}
            </EditSection>
        </EpistoFlex2>

        {/* coin stuff */}
        <EditSection
            title="EpistoCoin">

            <EpistoLabel
                isOverline
                text="Egyenleg">

                <EpistoFont
                    fontSize="fontLargePlus"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 5,
                        fontWeight: 600
                    }}>

                    {coinBalance}
                    <EpistoConinImage style={{
                        width: 20,
                        height: 20,
                        marginLeft: 5
                    }} />
                </EpistoFont>
            </EpistoLabel>

            <EpistoLabel width="100%"
                isOverline
                text="EpistoCoin hozzáadása">

                <EpistoFlex2 align="center"
                    flex="1"
                    mt="10px">
                    <EpistoEntryNew
                        flex="1"
                        style={{
                            margin: '0 5px 0 0'
                        }}
                        type="number"
                        placeholder='Összeg amelyet hozzá szeretnél adni'
                        state={coinAmountEntryState} />

                    <EpistoButton
                        isDisabled={!!coinAmountEntryState.error}
                        onClick={handleAddCoinsAsync}
                        variant="colored">

                        Hozzáadás
                    </EpistoButton>
                </EpistoFlex2>

            </EpistoLabel>
        </EditSection>

        {/* teacher stuff */}
        <EditSection
            title="Alkalmazás adatai">

            {/* is teacher */}
            <EpistoFont isUppercase
                fontSize="fontExtraSmall"
                style={{
                    marginTop: 10,
                    letterSpacing: '1.2px'
                }}>
                {translatableTexts.administration.editUserControl.selectAsTeacher}
            </EpistoFont>

            <EpistoFlex2 align="center">
                <Checkbox
                    checked={isTeacher}
                    onChange={(_, x) => setIsTeacher(x)} />

                <EpistoFont
                    style={{ flex: '1' }}>

                    {translatableTexts.administration.editUserControl.selectUserAsTeacher}
                </EpistoFont>
            </EpistoFlex2>
        </EditSection>

        {/* buttons */}
        <TailingAdminButtons
            onDeleteCallback={() => {

                if (showDeleteUserDialog) {

                    showDeleteUserDialog(editDTO);
                } else {

                    throw new Error('Not implemented!');
                    // history.goBack();
                }
            }}
            onSaveCallback={handleSaveUserAsync} />
    </EpistoFlex2 >;
};
