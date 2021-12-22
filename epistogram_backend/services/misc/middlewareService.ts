import cors from 'cors';
import { Request } from 'express';
import { User } from '../../models/entity/User';
import { apiRoutes } from '../../models/shared_models/types/apiRoutes';
import { getAsyncMiddlewareHandler } from '../../utilities/apiHelpers';
import { getAuthTokenFromRequest, getCookie, TypedError } from '../../utilities/helpers';
import { GlobalConfiguration } from './GlobalConfiguration';
import { log } from './logger';

export const getAuthMiddleware = (
    config: GlobalConfiguration,
    getRequestAccessTokenPayload: (accessToken: string) => any,
    getUserById: (userId: number) => Promise<User>,
    openRoutes: string[]) => getAsyncMiddlewareHandler(async (req: Request) => {

        const currentRoutePath = req.path;

        log(`Authorizing request: ${currentRoutePath}`);

        // do not authenticate on open routes
        if (openRoutes.some(x => x === currentRoutePath)) {

            log(`Route [${currentRoutePath}] is an open route, skipping authentication!`);
            return;
        }

        const accessToken = getAuthTokenFromRequest(req, config);
        const payload = getRequestAccessTokenPayload(accessToken);

        const user = await getUserById(payload.userId);
        if (!user)
            throw new TypedError("User not found by id: " + payload.userId, "bad request");

        // user is now authorized to access applicaiton
        // but some routes are still permitted
        if (!user.userActivity.canAccessApplication) {

            const unprotectedRoutes = [
                apiRoutes.authentication.getCurrentUser,
                apiRoutes.authentication.renewUserSession,
                apiRoutes.signup.getSignupData,
                apiRoutes.signup.answerSignupQuestion,
                apiRoutes.signup.getUserPersonalityData
            ];

            if (!unprotectedRoutes.some(x => x === currentRoutePath))
                throw new TypedError("User has not proper rights to access the requested resource.", "forbidden");
        }

        log(`Request [${currentRoutePath}] is permitted. UserId: ${user.id}`);
    });

export const getUnderMaintanenceMiddleware = (config: GlobalConfiguration) => getAsyncMiddlewareHandler(async (req, res, next) => {

    if (!config.misc.isUnderMaintanence)
        return;

    throw new TypedError("Server is under maintanence!", "under maintenance")
});

export const getCORSMiddleware = (config: GlobalConfiguration) => cors({
    origin: config.misc.frontendUrl,
    credentials: true,
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization"
    ],
    preflightContinue: false,
    methods: "DELETE, PATCH"
});