import { AuthenticationService } from '../services/AuthenticationService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { getAuthCookies } from '../utilities/helpers';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class AuthenticationController implements XController<AuthenticationController> {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfiguration;

    constructor(serviceProvider: ServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._config = serviceProvider.getService(GlobalConfiguration);
    }

    @XControllerAction(apiRoutes.authentication.loginUser, { isPost: true, isPublic: true })
    async logInUserAction(params: ActionParams) {

        // check request 
        if (!params.req.body)
            throw new ErrorWithCode('Body is null.', 'bad request');

        // get credentials from request
        const { email, password } = params.req.body;

        const { accessToken, refreshToken } = await this
            ._authenticationService
            .logInUserAsync(email, password, params.companyId);

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._config.cookieOptions);
    }

    @XControllerAction(apiRoutes.authentication.establishAuthHandshake, { isPublic: true })
    async establishAuthHandshakeAction(params: ActionParams) {

        const { refreshToken } = getAuthCookies(params.req, this._config);

        const data = await this
            ._authenticationService
            .establishAuthHandshakeAsync(refreshToken, params.companyId);

        setAuthCookies(this._config, params.res, data.newAccessToken, data.newRefreshToken, this._config.cookieOptions);

        return data.authData;
    }

    @XControllerAction(apiRoutes.authentication.logoutUser, { isPost: true, isUnauthorized: true })
    async logOutUserAction(params: ActionParams) {

        await this._authenticationService
            .logOutUserAsync(params.principalId);

        // remove browser cookies
        params.res.clearCookie(this._config.misc.accessTokenCookieName, this._config.cookieOptions);
        params.res.clearCookie(this._config.misc.refreshTokenCookieName, this._config.cookieOptions);
    }
}