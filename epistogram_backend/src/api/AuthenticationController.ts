import { AuthenticationService } from '../services/AuthenticationService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { getAuthCookies } from '../utilities/helpers';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { AuthorizationResult, XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class AuthenticationController implements XController<AuthenticationController> {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfiguration;

    constructor(serviceProvider: ServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._config = serviceProvider.getService(GlobalConfiguration);
    }

    @XControllerAction(apiRoutes.authentication.loginUser, { isPost: true, isPublic: true })
    logInUserAction(params: ActionParams) {

        return {
            action: async () => {
                // check request 
                if (!params.req.body)
                    throw new ErrorWithCode('Body is null.', 'bad request');

                // get credentials from request
                const { email, password } = params.req.body;

                const { accessToken, refreshToken } = await this._authenticationService
                    .logInUser(email, password);

                setAuthCookies(this._config, params.res, accessToken, refreshToken);
            },
            auth: async () => {
                return AuthorizationResult.ok;
            }
        };
    }

    @XControllerAction(apiRoutes.authentication.establishAuthHandshake, { isPublic: true })
    establishAuthHandshakeAction(params: ActionParams) {

        return {
            action: async () => {
                const { refreshToken } = getAuthCookies(params.req);

                const data = await this._authenticationService
                    .establishAuthHandshakeAsync(refreshToken);

                setAuthCookies(this._config, params.res, data.newAccessToken, data.newRefreshToken);

                return data.authData;
            },

            auth: async () => {
                return AuthorizationResult.ok;
            }
        };
    }

    @XControllerAction(apiRoutes.authentication.logoutUser, { isPost: true, isUnauthorized: true })
    logOutUserAction(params: ActionParams) {

        return {
            action: async () => {
                await this._authenticationService
                    .logOutUserAsync(params.principalId);

                // remove browser cookies
                params.res.clearCookie(this._config.misc.accessTokenCookieName);
                params.res.clearCookie(this._config.misc.refreshTokenCookieName);
            },
            auth: async () => {
                return AuthorizationResult.ok;
            }
        };
    }
}