import { Box, FlexProps } from '@chakra-ui/react';
import { GridOn, List } from '@mui/icons-material';
import { FormControl, FormGroup, Switch } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ReactNode, useCallback } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { CourseApiService } from '../../services/api/courseApiService';
import { useShopItemBriefData } from '../../services/api/shopApiService';
import { UserApiService } from '../../services/api/userApiService';
import { getKeys } from '../../shared/logic/sharedLogic';
import { Id } from '../../shared/types/versionId';
import { ArrayBuilder, useIsMatchingCurrentRoute } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

const Content = (props: {
    isCurrent: boolean,
    title: string
    iconComponent?: JSX.Element,
}) => {

    const { iconComponent, isCurrent, title } = props;

    return (
        <EpistoFlex2>

            {iconComponent && <EpistoFlex2
                width={27}
                height="100%"
                m={'2px 10px 2px 2px'}>

                {iconComponent}
            </EpistoFlex2>}

            <EpistoFont
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontWeight: isCurrent ? 'bold' : undefined,
                    alignItems: 'center',
                    padding: '0 2px 0 5px'
                }}>

                {title}
            </EpistoFont>
        </EpistoFlex2>
    );
};

export const BreadcrumbLink = (props: {
    title: string,
    isCurrent: boolean,
    iconComponent?: JSX.Element,
    route?: ApplicationRoute,
}) => {

    const { route, title, iconComponent, isCurrent } = props;
    const isLink = !isCurrent && route;

    return <Box>

        {isLink
            ? (
                <NavLink
                    to={route.route.getAbsolutePath()}>

                    <Content
                        iconComponent={iconComponent}
                        isCurrent={isCurrent}
                        title={title} />
                </NavLink>
            )
            : (
                <Content
                    iconComponent={iconComponent}
                    isCurrent={isCurrent}
                    title={title} />
            )}
    </Box>;
};

export type BreadcrumbDataType = {

}

export const AdminBreadcrumbsHeader = (props: {
    children?: ReactNode,
    breadcrumbDatas?: BreadcrumbDataType[],
    subRouteLabel?: string,
    viewSwitchChecked?: boolean,
    viewSwitchFunction?: (checked: boolean) => void
} & FlexProps) => {

    const { subRouteLabel, children, breadcrumbDatas: breadcrumbs, viewSwitchChecked, viewSwitchFunction, ...css } = props;

    // params
    const urlParams = useParams<{ userId: string, courseId: string, videoId: string, examId: string, shopItemId: string }>();
    const userId = urlParams.userId
        ? Id.create<'User'>(parseInt(urlParams.userId))
        : null;
    const courseId = urlParams.courseId
        ? Id.create<'Course'>(parseInt(urlParams.courseId))
        : null;
    const shopItemId = urlParams.shopItemId
        ? Id.create<'ShopItem'>(parseInt(urlParams.shopItemId))
        : null;

    // util
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();

    // http
    const { briefUserData } = UserApiService.useBriefUserData(userId);
    const { courseBriefData } = CourseApiService.useCourseBriefData(courseId);
    const { shopItemBriefData } = useShopItemBriefData(shopItemId);

    // calc

    const getCurrentRoute = useCallback(() => {

        const isApplicationRoute = (obj: any) => !!obj.route;

        return getKeys(applicationRoutes.administrationRoute)
            .map(x => applicationRoutes.administrationRoute[x] as ApplicationRoute)
            .filter(x => isApplicationRoute(x))
            .single(route => isMatchingCurrentRoute(route).isMatchingRoute);
    }, [isMatchingCurrentRoute]);

    const currentRoute = getCurrentRoute();

    const subRouteName = subRouteLabel
        ? subRouteLabel
        : (briefUserData?.fullName || courseBriefData?.title || shopItemBriefData?.name);

    const subRoute = subRouteName
        ? { title: subRouteName! }
        : null;

    return <EpistoFlex2
        id={AdminBreadcrumbsHeader.name}
        flex="1"
        direction={'column'}>

        <EpistoFlex2
            justify="space-between"
            minH="38px">

            {/* breadcrumbs */}
            <Breadcrumbs>
                {!breadcrumbs && new ArrayBuilder()
                    .addIf(!!currentRoute, <BreadcrumbLink
                        key={1}
                        isCurrent={!subRoute}
                        route={currentRoute}
                        title={currentRoute.title}
                        iconComponent={currentRoute.icon} />)
                    .addIf(!!subRoute, <BreadcrumbLink
                        key={2}
                        isCurrent
                        title={subRoute?.title ?? ''} />)
                    .getArray()}
            </Breadcrumbs>

            {viewSwitchFunction && <FormGroup>

                <FormControl style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <List />
                    <Switch
                        checked={viewSwitchChecked}
                        onChange={(e) => {
                            if (!viewSwitchFunction)
                                return;

                            viewSwitchFunction(e.currentTarget.checked);
                        }} />
                    <GridOn />
                </FormControl>
            </FormGroup>}
        </EpistoFlex2>

        {/* children  */}
        <EpistoFlex2
            direction="row"
            mt="10px"
            flex="1"
            {...css}>

            {children}
        </EpistoFlex2>
    </EpistoFlex2 >;
};