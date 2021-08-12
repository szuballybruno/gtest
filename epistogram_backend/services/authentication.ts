import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { globalConfig } from "../server";
import { getRefreshTokenByUserEmail, setRefreshToken } from "./authenticationPersistance";
import { log, logError } from "./logger";
import {Request, Response, NextFunction} from "express";

export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";
const accessTokenLifespanInS = 30;
const refreshTokenLifespanInS = 604800; // one week

export const getAccessToken = (user: {_id: string, organizationId:string, email: string, refreshToken?: string}) => jwt.sign(
    { _id: user._id, email: user.email },
    globalConfig.security.jwtSignSecret,
    { expiresIn: `${accessTokenLifespanInS}s` });

export const getRefreshToken = (user: {_id: string, organizationId:string, email: string, refreshToken?: string}) => {
    let isValid

    getRefreshTokenByUserEmail(user.email).then(token => {
        isValid = validateToken(token, globalConfig.security.jwtSignSecret).isValid;
        if (isValid)
            return token;
    }).catch(e => {
        log("Error getting the token" + e)
    });

    const refreshToken = jwt.sign({ _id: user._id, email: user.email }, globalConfig.security.jwtSignSecret);
    setRefreshToken(user.email, refreshToken).then(() => {
        return refreshToken;
    });
    return refreshToken

}

export const validateToken = (token: string, secret: string) => {

    const returnValue = { isValid: false, tokenMeta: null as any | null };

    try {
        jwt.verify(token, secret);
        returnValue.isValid = true;
    }
    catch (e) {

        logError(e);
    }

    if (returnValue.isValid) {
        returnValue.tokenMeta = jwt.decode(token) as any;
    }

    return returnValue;
}

export const getRequestAccessTokenMeta = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        throw new Error("Access token not present in request!");

    const { isValid, tokenMeta } = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!isValid)
        throw new Error("Access token invalid or expired!");

    return tokenMeta;
}

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
    res.cookie(accessTokenCookieName, accessToken, {
        secure: false, //TODO: Write back to secure
        httpOnly: true,
        expires: dayjs().add(accessTokenLifespanInS, "seconds").toDate()
    });
}

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: false, //TODO: Write back to secure
        httpOnly: true,
        expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}

export const setUserIdCookie = (res: Response, userId: string) => {
    res.cookie("userId", userId, {
        secure: false, //TODO: Write back to secure
        httpOnly: false,
        //expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}
export const setOrganizationIdCookie = (res: Response, organizationId: string) => {
    res.cookie("organizationId", organizationId, {
        secure: false, //TODO: Write back to secure
        httpOnly: false,
        //expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}

export const getCookies = (req: Request) => {

    const cookieString = (req.headers.cookie as string);
    if (!cookieString)
        return [];

    return cookieString
        .split('; ')
        .map(x => ({
            key: x.split("=")[0],
            value: x.split("=")[1]
        }));
}

export const getCookie = (req: Request, key: string) => getCookies(req).filter(x => x.key == key)[0];

export const respondValidationError = (res: Response, error: string) =>
    res.status(400).json({ error: error });

export const setAuthCookies = (res: Response, user: {_id: string, organizationId:string, email: string, refreshToken?: string}) => {
    const accessToken = getAccessToken(user);
    setAccessTokenCookie(res, accessToken);

    const refreshToken = getRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    setUserIdCookie(res, user._id)
    setOrganizationIdCookie(res, user.organizationId)
}

export const authorizeRequest = (req: Request, onAuthorized: (user: {_id: string, organizationId:string, email: string, refreshToken?: string}) => void, onError: () => void) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken) {
        onError();
        return;
    }

    const { isValid, tokenMeta: user } = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!isValid) {
        onError();
        return;
    }

    onAuthorized(user as any);
}