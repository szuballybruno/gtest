import { Flex } from '@chakra-ui/react';
import { Add } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useUserOverviewStats } from '../../../services/api/userStatsApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { UserOverviewDTO } from '../../../shared/dtos/UserOverviewDTO';
import { OrderType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { getSubroutes, useIsMatchingCurrentRoute, usePaging } from '../../../static/frontendHelpers';
import { useRouteQuery, useSetQueryParams } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { segmentedButtonStyles } from '../../controls/segmentedButtonStyles';
import { ProfileImage } from '../../ProfileImage';
import { UsersSearchFilters } from './UsersSearchFilters';

const useColumns = (isSimpleView: boolean, userId: Id<'User'> | null, openUser: (userId: Id<'User'>) => void) => {

    const { navigate2 } = useNavigation();

    const columns = new EpistoDataGridColumnBuilder<RowType, Id<'User'>>()
        .add({
            field: 'avatar',
            headerName: 'Avatar',
            width: isSimpleView ? 60 : 80,
            renderCell: ({ value, row }) => <EpistoFlex2
                className="whall"
                justify="center"
                align='center'
                cursor={isSimpleView ? 'pointer' : undefined}
                onClick={isSimpleView ? () => openUser(row.userId) : undefined}>
                <ProfileImage
                    className={isSimpleView ? 'square40' : 'square50'}
                    objectFit="contain"
                    url={value.avatarUrl ? Environment.getAssetUrl(value.avatarUrl) : null}
                    firstName={value.firstName}
                    lastName={value.lastName} />
            </EpistoFlex2>
        });

    if (isSimpleView)
        return columns
            .add({
                field: 'nameSimple',
                headerName: 'Név',
                width: 250,
                renderCell: ({ row }) => (
                    <EpistoFlex2
                        className='whall'
                        cursor='pointer'
                        onClick={() => openUser(row.userId)}
                        direction="column"
                        justify='center'>
                        <EpistoFont
                            fontWeight={userId === row.userId ? 'heavy' : undefined}>
                            {row.name}
                        </EpistoFont>
                        <EpistoFont
                            fontWeight={userId === row.userId ? 'heavy' : undefined}>
                            {row.email}
                        </EpistoFont>
                    </EpistoFlex2>
                )
            })
            .getColumns();

    const allColumns = columns
        .add({
            field: 'name',
            headerName: 'Név',
            width: 250
        })
        .add({
            field: 'email',
            headerName: 'E-mail',
        })
        .add({
            field: 'signupDate',
            headerName: 'Regisztráció ideje',
        })
        .add({
            field: 'averagePerformancePercentage',
            headerName: 'Átlagos teljesítmény',
        })
        .add({
            field: 'invertedLagBehind',
            headerName: 'Haladás',
        })
        .add({
            field: 'totalSessionLengthSeconds',
            headerName: 'Platformon eltöltött idő',
        })
        .add({
            field: 'completedCourseItemCount',
            headerName: 'Megtekintett videók száma',
        })
        .add({
            field: 'productivityPercentage',
            headerName: 'Produktivitás',
        })
        .add({
            field: 'engagementPoints',
            headerName: 'Elköteleződés',
        })
        .add({
            field: 'detailsButton',
            headerName: '',
            renderCell: ({ value }) =>

                <EpistoButton
                    variant="outlined"
                    onClick={() => navigate2(applicationRoutes.administrationRoute.usersRoute.userRoute.editRoute, { userId: value })}>

                    Bovebben
                </EpistoButton>
        })
        .getColumns();

    return allColumns;
};

class RowType {
    userId: Id<'User'>;
    avatar: {
        avatarUrl: string,
        firstName: string,
        lastName: string
    };
    name: string;
    nameSimple: string;
    email: string;
    signupDate: string;
    averagePerformancePercentage: number;
    invertedLagBehind: number;
    totalSessionLengthSeconds: number;
    completedCourseItemCount: number;
    engagementPoints: number;
    productivityPercentage: number;
    detailsButton: Id<'User'>;
};

export type UserDataGridPresetType = 'reviewRequired' | 'all'

const mapToRow = (user: UserOverviewDTO): RowType => {

    const name = user.firstName ? `${user.lastName} ${user.firstName}` : '';

    return ({
        userId: user.userId,
        avatar: {
            avatarUrl: user.avatarFilePath,
            firstName: user.firstName,
            lastName: user.lastName
        },
        name,
        nameSimple: name,
        email: user.userEmail,
        signupDate: new Date(user.signupDate)
            .toLocaleDateString('hu-hu', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) + '',
        averagePerformancePercentage: user.averagePerformancePercentage,
        invertedLagBehind: user.invertedLagBehind,
        totalSessionLengthSeconds: user.totalSessionLengthSeconds,
        completedCourseItemCount: user.completedCourseItemCount,
        engagementPoints: user.engagementPoints,
        productivityPercentage: user.productivityPercentage,
        detailsButton: user.userId
    });
};

export const useGridFilterSettingsLogic = () => {

    const [orderBy, setOrderBy] = useState<OrderType | null>(null);
    const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

    const presets = useMemo(() => [
        {
            title: 'Alapértelmezett nézet',
            preset: 'all' as UserDataGridPresetType
        },
        {
            title: 'Áttekintésre javasolt',
            preset: 'reviewRequired' as UserDataGridPresetType
        }
    ], []);

    const { setQueryParams } = useSetQueryParams();

    const presetPaging = usePaging({ items: presets, onItemSet: ({ item }) => setQueryParams('preset', item.preset) });

    const currentPreset = useRouteQuery(applicationRoutes.administrationRoute.usersRoute)
        .getValueOrNull(x => x.preset, 'string') ?? 'all';

    const currentPresetIndex = presets
        .singleIndex(x => x.preset === currentPreset);

    const isReviewPreset = currentPreset === 'reviewRequired';

    /**
     * sync paging selected item to url
     */
    useEffect(() => {

        presetPaging.setItem(currentPresetIndex);
    }, [currentPresetIndex]);

    return {
        orderBy,
        isReviewPreset,
        presetPaging,
        currentPreset,
        setOrderBy,
        setSearchKeyword,
        searchKeyword
    };
};

export type GridFilterSettingsLogicType = ReturnType<typeof useGridFilterSettingsLogic>;

export const useAdminUserGridLogic = ({
    filterLogic,
    isSimpleView,
    selectedCompanyId,
    userId
}: {
    isSimpleView: boolean,
    selectedCompanyId: Id<'Company'> | null,
    filterLogic: GridFilterSettingsLogicType,
    userId: Id<'User'> | null
}) => {

    const { searchKeyword, isReviewPreset } = filterLogic;

    console.log(isReviewPreset);

    const {
        userOverviewStats,
        refetchOverviewStats
    } = useUserOverviewStats(isReviewPreset, selectedCompanyId);

    const searchIn = (text: string) => {

        if (!searchKeyword)
            return true;

        return text
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
    };

    const users = searchKeyword
        ? userOverviewStats
            .filter(x => searchIn(x.firstName) || searchIn(x.lastName))
        : userOverviewStats;

    return {
        filterLogic,
        isSimpleView,
        users,
        refetchUsers: refetchOverviewStats,
        userId
    };
};

export type AdminUserGridLogicType = ReturnType<typeof useAdminUserGridLogic>;

export const AminUserGridView = ({
    logic: {
        users,
        filterLogic,
        isSimpleView,
        userId
    }
}: {
    logic: AdminUserGridLogicType
}) => {

    const userRows = users
        .map(mapToRow);

    const { navigate2 } = useNavigation();
    const { usersRoute } = applicationRoutes.administrationRoute;
    const { userRoute } = usersRoute;
    const isMatchingCurrentAppRoute = useIsMatchingCurrentRoute();

    const columns = useColumns(isSimpleView, userId, userId => {

        getSubroutes(userRoute)
            .forEach(appRoute => {

                if (isMatchingCurrentAppRoute(appRoute).isMatchingRouteExactly) {

                    navigate2(appRoute, { userId });
                }
            });
    });

    return (
        <Flex
            direction={'column'}
            className="whall roundBorders"
            background={'var(--transparentWhite70)'}
            px="5px"
            position="relative">

            {/* header */}
            <Flex
                justify='space-between'
                align='center'
                h='60px'>

                {!isSimpleView && <SegmentedButton
                    paging={filterLogic.presetPaging}
                    getDisplayValue={x => x.title}
                    stylePreset={segmentedButtonStyles.tab} />}

                <EpistoFlex2
                    flex={isSimpleView ? '1' : undefined}>

                    {/* search bar */}
                    <UsersSearchFilters
                        hideOrdering={true}
                        setSearchKeyword={filterLogic.setSearchKeyword}
                        setOrderBy={filterLogic.setOrderBy} />

                    {/* add button */}
                    {!isSimpleView && <EpistoButton
                        style={{
                            alignItems: 'center'
                        }}>

                        <Add
                            style={{
                                height: 30
                            }}
                            onClick={() => navigate2(usersRoute.addRoute)} />
                    </EpistoButton>}
                </EpistoFlex2>
            </Flex>

            {/* content */}
            <EpistoDataGrid
                columns={columns}
                rows={userRows}
                getKey={x => x.userId}
                pinnedColumns={{
                    right: ['detailsButton']
                }} />
        </Flex>
    );
};
