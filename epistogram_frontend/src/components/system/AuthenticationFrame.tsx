import { Flex } from '@chakra-ui/react';
import { createContext, useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AuthenticationStateType, useGetAuthHandshake } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Environment } from '../../static/Environemnt';
import { PropsWithChildren, useCurrentUrlPathname, useGetCurrentAppRoute } from '../../static/frontendHelpers';

const getAuthorizationContextData = (permissionCodes?: PermissionCodeType[]) => {

    return {
        hasPermission: (permCode: PermissionCodeType) => {

            if (!permissionCodes)
                return false;

            const isFound = permissionCodes
                .any(code => code === permCode);

            return isFound;
        },
        isAuthenticated: true
    };
};

type AuthorizationContextDataType = ReturnType<typeof getAuthorizationContextData>;

export const AuthorizationContext = createContext<AuthorizationContextDataType>(getAuthorizationContextData());

const userDefaults: UserDTO = {
    avatarUrl: '',
    companyId: -1,
    email: '',
    firstName: '',
    id: -1,
    isInvitationAccepted: true,
    isTrusted: true,
    jobTitle: {
        id: -1,
        name: ''
    },
    lastName: '',
    name: '',
    phoneNumber: ''
};

export const CurrentUserContext = createContext<UserDTO>(userDefaults);
export const RefetchUserAsyncContext = createContext<() => Promise<void>>(() => Promise.resolve());
export const AuthenticationStateContext = createContext<AuthenticationStateType>('loading');

const AuthFirewall = (props: PropsWithChildren & {
    authState: AuthenticationStateType
}): JSX.Element => {

    const { authState, children } = props;
    const dest = useCurrentUrlPathname();
    const loginRoute = applicationRoutes.loginRoute;
    const signupRoute = applicationRoutes.signupRoute;
    const { navigate } = useNavigation();
    const currentRoute = useGetCurrentAppRoute();
    const { hasPermission } = useContext(AuthorizationContext);
    const isUnauthorized = !!currentRoute.isUnauthorized;

    if (Environment.loggingSettings.auth)
        console.log(`Current route: ${currentRoute.route.getAbsolutePath()} IsUnrestricted: ${isUnauthorized}`);

    // if loading return blank page
    if (authState === 'loading') {

        if (Environment.loggingSettings.auth)
            console.log(`Auth state: ${authState}. Rendering empty div until loaded.`);

        return <div></div>;
    }

    // error
    if (authState === 'error') {

        if (Environment.loggingSettings.auth)
            console.log(`Auth state: ${authState}. Rendering error page.`);

        return <Flex
            className="whall"
            align="center"
            justify="center">

            Error!
        </Flex>;
    }

    // check authentication 
    if (authState === 'forbidden' && !isUnauthorized) {

        if (Environment.loggingSettings.auth)
            console.log(`Auth state: ${authState}. Redirecting...`);

        navigate(loginRoute, undefined, { dest });

        return <div></div>;
    }

    // check authorization
    const canAccess = hasPermission('ACCESS_APPLICATION');
    const ignoreAccessAppRestriction = !!currentRoute.ignoreAccessAppRestriction;
    if (!canAccess && !ignoreAccessAppRestriction && !isUnauthorized) {

        console.log(`canaccess: ${canAccess} ignore: ${ignoreAccessAppRestriction} isunauth: ${isUnauthorized}`);

        if (Environment.loggingSettings.auth)
            console.log(`Auth state: ${authState}. No ${'ACCESS_APPLICATION' as PermissionCodeType} permission. Redirecting...`);

        navigate(signupRoute, undefined);

        return <div></div>;
    }

    if (Environment.loggingSettings.auth)
        console.log(`Auth state: ${authState}. Rendering content...`);

    return <>
        {children}
    </>;
};

export const AuthenticationFrame = (props) => {

    // start auth pooling
    const { authData, authState, refetchAuthHandshake } = useGetAuthHandshake();

    if (Environment.loggingSettings.auth)
        console.log(`Auth state is: '${authState}'...`);

    // authorization context 
    const authContextData = getAuthorizationContextData(authData?.permissions ?? []);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserAsyncContext.Provider value={() => refetchAuthHandshake()}>
            <CurrentUserContext.Provider value={authData?.currentUser ?? userDefaults}>
                <AuthorizationContext.Provider value={authContextData}>
                    <AuthFirewall authState={authState}>
                        {props.children}
                    </AuthFirewall>
                </AuthorizationContext.Provider>
            </CurrentUserContext.Provider>
        </RefetchUserAsyncContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element;
};
