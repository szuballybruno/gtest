import { Request, Response } from "express";
import { User } from "../models/entity/User";
import { staticProvider } from "../staticProvider";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { getCookie, TypedError } from "../utilities/helpers";
import { comparePasswordAsync, hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { TokenService } from "./TokenService2";
import { UserService } from "./UserService2";

export class AuthenticationService {

    private _userService: UserService;
    private _tokenService: TokenService;

    constructor(userService: UserService, tokenService: TokenService) {

        this._userService = userService;
        this._tokenService = tokenService;
    }

    getRequestAccessTokenPayload = (req: Request) => {

        const accessToken = getCookie(req, staticProvider.globalConfig.misc.accessTokenCookieName)?.value;
        if (!accessToken)
            throw new TypedError("Token not sent.", "bad request");

        const tokenPayload = this._tokenService.verifyAccessToken(accessToken);
        if (!tokenPayload)
            throw new TypedError("Token is invalid.", "bad request");

        return tokenPayload;
    }

    getUserIdFromRequest = (req: Request) => {

        return this.getRequestAccessTokenPayload(req).userId;
    }

    renewUserSessionAsync = async (req: Request, res: Response) => {

        log("Renewing user session...");

        // check if there is a refresh token sent in the request 
        const refreshToken = getCookie(req, "refreshToken")?.value;
        if (!refreshToken)
            throw new TypedError("Refresh token not sent.", "bad request");

        // check sent refresh token if invalid by signature or expired
        const tokenMeta = this._tokenService.verifyRefreshToken(refreshToken);

        // check if this refresh token is associated to the user
        const refreshTokenFromDb = await this._userService
            .getUserActiveTokenById(tokenMeta.userId);

        if (!refreshTokenFromDb)
            throw new TypedError(`User has no active token, or it's not the same as the one in request! User id '${tokenMeta.userId}', active token '${refreshTokenFromDb}'`, "forbidden");

        // get user 
        const user = await this._userService
            .getUserDTOById(tokenMeta.userId);

        if (!user)
            throw new TypedError("User not found by id " + tokenMeta.userId, "internal server error");

        // get tokens
        const newAccessToken = this._tokenService.createAccessToken(user.id);
        const newRefreshToken = this._tokenService.createRefreshToken(user.id);

        // save refresh token to DB
        await this._userService
            .setUserActiveRefreshToken(user.id, refreshToken);

        await setAuthCookies(res, newAccessToken, newRefreshToken);
    }

    requestChangePasswordAsync = async (userId: number, oldPassword: string) => {

        const resetPawsswordToken = this._tokenService.createResetPasswordToken(userId);
        const user = await this._userService
            .getUserById(userId);

        if (!await comparePasswordAsync(oldPassword, user.password))
            throw new TypedError("Wrong password!", "bad request");

        await staticProvider
            .ormConnection
            .getRepository(User)
            .save({
                id: user.id,
                resetPasswordToken: resetPawsswordToken
            });

        const resetPawsswordUrl = staticProvider.globalConfig.misc.frontendUrl + `/set-new-password?token=${resetPawsswordToken}`;

        await staticProvider.services.emailService.sendResetPasswordMailAsync(user, resetPawsswordUrl);
    }

    changePasswordAsync = async (
        userId: number,
        password: string,
        passwordCompare: string,
        passwordResetToken: string) => {

        const user = await this._userService
            .getUserById(userId);

        // verify new password with compare password 
        if (password !== passwordCompare)
            throw new TypedError("Passwords don't match.", "bad request");

        // verify token
        const tokenPayload = this._tokenService.verifyPasswordResetToken(passwordResetToken);

        // verify token user id 
        if (tokenPayload.userId !== user.id)
            throw new TypedError("Wrong token.", "bad request");

        // verify user reset password token
        if (user.resetPasswordToken !== passwordResetToken)
            throw new TypedError("Wrong token.", "bad request");

        // hash new password
        const hashedPassword = await hashPasswordAsync(password);

        await staticProvider
            .ormConnection
            .getRepository(User)
            .save({
                id: user.id,
                resetPasswordToken: null,
                password: hashedPassword
            } as User);
    }

    logInUser = async (email: string, password: string) => {

        log(`Logging in user... ${email} - ${password}`);

        // further validate request 
        if (!email || !password)
            throw new TypedError("Email or password is null.", "bad request");

        // authenticate
        const user = await this._userService
            .getUserByEmail(email);

        if (!user)
            throw new TypedError("Invalid email.", "forbidden");

        const isPasswordCorrect = await comparePasswordAsync(password, user.password);
        if (!isPasswordCorrect)
            throw new TypedError("Invalid password.", "forbidden");

        const userId = user.id;

        await staticProvider
            .services
            .userSessionActivityService
            .saveUserSessionActivityAsync(userId, "login");

        // get auth tokens 
        const tokens = await this.getUserLoginTokens(userId);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    logOutUserAsync = async (userId: number) => {

        await staticProvider
            .services
            .userSessionActivityService
            .saveUserSessionActivityAsync(userId, "logout");

        // remove refresh token, basically makes it invalid from now on
        await this._userService
            .removeRefreshToken(userId);
    }

    getUserLoginTokens = async (userId: number) => {

        // get tokens
        const accessToken = this._tokenService.createAccessToken(userId);
        const refreshToken = this._tokenService.createRefreshToken(userId);

        return {
            accessToken,
            refreshToken
        }
    }
}