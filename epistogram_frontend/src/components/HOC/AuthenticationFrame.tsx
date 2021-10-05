import { createContext } from "react";
import { globalConfig } from "../../configuration/config";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { AuthenticationStateType, useRenewUserSessionPooling, useUserFetching } from "../../services/authenticationService";
import setTheme from "../../services/setTheme";

export const CurrentUserContext = createContext<UserDTO | null>(null);
export const RefetchUserFunctionContext = createContext<() => void>(() => { });
export const AuthenticationStateContext = createContext<AuthenticationStateType>("loading");

export const AuthenticationFrame = (props) => {

    //SET THEME
    setTheme(globalConfig.currentTheme);

    // start auth pooling 
    const { isSuccess } = useRenewUserSessionPooling();

    if (globalConfig.verboseLogging)
        console.log("Renewing token: " + isSuccess);

    // fetch current user 
    const { currentUser, refetchUser, authState } = useUserFetching(isSuccess);

    if (globalConfig.verboseLogging)
        console.log("Authentication state: " + authState);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserFunctionContext.Provider value={refetchUser}>
            <CurrentUserContext.Provider value={currentUser}>
                {props.children}
            </CurrentUserContext.Provider>
        </RefetchUserFunctionContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element
}