import { ReactNode, useMemo } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { AdminActiveCompanyIdType, AdminActiveCompanyRouteParamType, ApplicationRoute } from '../../models/types';
import { FeatureApiService } from '../../services/api/FeatureApiService';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { Logger } from '../../static/Logger';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { useCurrentUserContext } from '../system/AuthenticationFrame';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { useCheckFeatureEnabled } from '../system/CheckFeatureFrame';
import { NavbarButton } from '../universal/NavbarButton';
import { ContinueCourseButton } from './ContinueCourseButton';
import { ShopAndNotifications } from './ShopAndNotifications';

export const DesktopNavbar = ({
    backgroundContent,
    showLogo,
    isLowHeight: _isLowHeight,
    isMinimalMode: _isMinimalMode,
    hideLinks1
}: {
    hideLinks1: boolean
    isLowHeight?: boolean
    showLogo?: boolean
    isMinimalMode?: boolean
    backgroundContent?: any
}) => {

    const isLowHeight = !!_isLowHeight;
    const isMinimalMode = !!_isMinimalMode;

    const { hasPermission } = useAuthorizationContext();
    const { companyId } = useCurrentUserContext();
    const activeCompanyId: AdminActiveCompanyIdType = companyId;

    const { checkFeature, checkFeatureState } = FeatureApiService.useCheckFeature();

    const { isFeatureEnabled: isHomePageEnabled } = useCheckFeatureEnabled({
        featureCode: 'HOME_PAGE'
    });

    const { isFeatureEnabled: isLeaderboardPageEnabled } = useCheckFeatureEnabled({
        featureCode: 'LEADERBOARD_PAGE'
    });

    /*  const [isHomePageEnabled, setIsHomePageEnabled] = useState(true);
 
     useEffect(() => {
 
         const handleCheckIfSurveyEnabled = async () => {
             const isHomePageEnabled = await checkFeature({
                 featureCode: 'HOME_PAGE'
             });
 
             setIsHomePageEnabled(isHomePageEnabled);
         };
 
         handleCheckIfSurveyEnabled();
 
     }, [checkFeature]); */

    const menuItems: ApplicationRoute[] = new ArrayBuilder<Omit<ApplicationRoute, 'icon'> & { icon: ReactNode }>()
        .addIf(hasPermission('ADMINISTRATE_COMPANY'), {
            title: applicationRoutes.administrationRoute.title,
            route: applicationRoutes.administrationRoute.usersRoute.route,
            icon: applicationRoutes.administrationRoute.icon
        })
        .addIf(isHomePageEnabled, {
            title: applicationRoutes.homeRoute.title,
            route: applicationRoutes.homeRoute.route,
            icon: applicationRoutes.homeRoute.icon
        })
        .add({
            title: applicationRoutes.availableCoursesRoute.title,
            route: applicationRoutes.availableCoursesRoute.route,
            icon: applicationRoutes.availableCoursesRoute.icon
        })
        .add({
            title: applicationRoutes.myProgressRoute.title,
            route: applicationRoutes.myProgressRoute.route,
            icon: applicationRoutes.myProgressRoute.icon
        })
        .addIf(isLeaderboardPageEnabled, {
            title: applicationRoutes.leaderboardRoute.title,
            route: applicationRoutes.leaderboardRoute.route,
            icon: applicationRoutes.leaderboardRoute.icon
        })
        .getArray() as any;

    const { navigate3 } = useNavigation();

    // context
    const { isAuthenticated } = useAuthorizationContext();

    // media
    const isLargerThan1300 = Responsivity
        .useIsLargerThan('1300px');

    const isLargerThan1000 = Responsivity
        .useIsLargerThan('1000px');

    // util
    const hideLinks = hideLinks1 || !isAuthenticated;
    const isMidMode = (isLargerThan1300 && !showLogo) || (isLargerThan1000 && showLogo);

    const handleNavigation = (route: ApplicationRoute) => {

        navigate3(route as ApplicationRoute<AdminActiveCompanyRouteParamType>, { params: { activeCompanyId } });
    };

    // funcs
    const MinimalRender = () => {

        return <EpistoFlex2>
            {menuItems
                .map((route, index) => {
                    return (
                        <EpistoButton
                            variant="plain"
                            key={index}
                            onClick={() => handleNavigation(route)}>

                            {route.icon}
                        </EpistoButton>
                    );
                })}
        </EpistoFlex2>;
    };

    const MidRender = () => {

        return (
            <EpistoFlex2
                height="50px"
                flex="1 0 600px">

                {/* menu items */}
                {menuItems
                    .map((route, index) => (
                        <NavbarButton
                            key={index}
                            menuName={route.title}
                            onClick={() => handleNavigation(route)} />
                    ))}

                {/* continue course button */}
                <ContinueCourseButton />
            </EpistoFlex2>
        );
    };

    const LargeRender = useMemo(() => () => {

        return (
            <EpistoFlex2>
                {menuItems
                    .map((route, index) => {

                        const navToRoute = () => {
                            handleNavigation(route);
                        };

                        return (
                            <EpistoButton
                                variant="plain"
                                key={index}
                                onClick={navToRoute}>

                                {route.icon}
                            </EpistoButton>
                        );
                    })}

                {/* continue watching  */}
                <ContinueCourseButton />
            </EpistoFlex2>
        );
    }, [handleNavigation, menuItems]);

    Logger.logScoped('RENDER', 'Rendering navbar');

    return (
        <EpistoFlex2
            align="center"
            width="100%"
            flex="1"
            height={isMinimalMode ? '30px' : isLowHeight ? '40px' : '60px'}
            mt={isLowHeight || isMinimalMode ? undefined : '10px'}
            mb={isLowHeight || isMinimalMode ? undefined : '10px'}
            bg={backgroundContent}
            justify={hideLinks ? 'center' : 'space-between'}>

            {/* logo link */}
            {showLogo && (
                <img
                    src={Environment.getAssetUrl('/images/logo.png')}
                    style={{
                        width: isMinimalMode ? '80px' : '150px',
                        height: isMinimalMode ? '50px' : '50px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                    }}
                    alt=""
                    onClick={() => handleNavigation(applicationRoutes.homeRoute)} />
            )}

            {/* menu items */}
            {!hideLinks && <>

                {/* minimal */}
                {isMinimalMode && <MinimalRender />}

                {/* mid  */}
                {!isMinimalMode && isMidMode && <MidRender />}

                {/* large */}
                {!isMinimalMode && !isMidMode && <LargeRender />}

                {/* shop and notification buttons */}
                <ShopAndNotifications
                    isLowHeight={isLowHeight}
                    isMinimalMode={isMinimalMode} />
            </>}
        </EpistoFlex2 >
    );
};
