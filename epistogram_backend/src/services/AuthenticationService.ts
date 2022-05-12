import { User } from '../models/entity/User';
import { AuthDataDTO } from '../shared/dtos/AuthDataDTO';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { HashService } from './HashService';
import { log } from './misc/logger';
import { TokenService } from './TokenService';
import { UserService } from './UserService';
import { UserSessionActivityService } from './UserSessionActivityService';

export class AuthenticationService {

    private _userService: UserService;
    private _tokenService: TokenService;
    private _userSessionActivityService: UserSessionActivityService;
    private _hashService: HashService;

    constructor(
        userService: UserService,
        tokenService: TokenService,
        userSessionActivityService: UserSessionActivityService,
        hashService: HashService) {

        this._userService = userService;
        this._tokenService = tokenService;
        this._userSessionActivityService = userSessionActivityService;
        this._hashService = hashService;
    }

    getRequestAccessTokenPayload = (accessToken: string) => {

        const tokenPayload = this._tokenService.verifyAccessToken(accessToken);
        if (!tokenPayload)
            throw new VerboseError('Token is invalid.', 'bad request');

        return tokenPayload;
    };

    async establishAuthHandshakeAsync(refreshToken: string | null) {

        log('Establishing auth handshake...');

        if (!refreshToken)
            throw new VerboseError('Refresh token not found!', 'forbidden');

        const { userId } = this._tokenService
            .verifyRefreshToken(refreshToken);

        // get user 
        const currentUser = await this._userService
            .getUserDTOById(userId);

        if (!currentUser)
            throw new Error('User not found by id.');

        // save session activity
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(currentUser.id, 'generic');

        // get new tokens
        const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        } = await this.renewUserSessionAsync(userId, refreshToken);

        return {
            authData: {
                currentUser
            } as AuthDataDTO,
            newAccessToken,
            newRefreshToken
        };
    }

    private renewUserSessionAsync = async (userId: number, prevRefreshToken: string) => {

        // check if this refresh token is associated to the user
        const refreshTokenFromDb = await this._userService
            .getUserRefreshTokenById(userId);

        if (!refreshTokenFromDb)
            throw new VerboseError(`User has no active token, or it's not the same as the one in request! User id '${userId}', active token '${refreshTokenFromDb}'`, 'forbidden');

        // get user 
        const user = await this._userService
            .getUserById(userId);

        if (!user)
            throw new VerboseError('User not found by id ' + userId, 'internal server error');

        // get tokens
        const { accessToken, refreshToken } = await this.getUserLoginTokens(user);

        // save refresh token to DB
        await this._userService
            .setUserActiveRefreshToken(user.id, prevRefreshToken);

        return {
            accessToken,
            refreshToken
        };
    };

    logInUser = async (email: string, password: string) => {

        log(`Logging in user... ${email} - ${password}`);

        // further validate request 
        if (!email || !password)
            throw new VerboseError('Email or password is null.', 'bad request');

        // authenticate
        const user = await this._userService
            .getUserByEmailAsync(email);

        if (!user)
            throw new VerboseError('Invalid email.', 'forbidden');

        const isPasswordCorrect = await this._hashService
            .comparePasswordAsync(password, user.password);

        if (!isPasswordCorrect)
            throw new VerboseError('Invalid password.', 'forbidden');

        const userId = user.id;

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'login');

        // get auth tokens 
        const tokens = await this.getUserLoginTokens(user);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    };

    logOutUserAsync = async (userId: PrincipalId) => {

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId.toSQLValue(), 'logout');

        // remove refresh token, basically makes it invalid from now on
        await this._userService
            .removeRefreshToken(userId.toSQLValue());
    };

    getUserLoginTokens = async (user: User) => {

        // get tokens
        const accessToken = this._tokenService.createAccessToken(user);
        const refreshToken = this._tokenService.createRefreshToken(user);

        return {
            accessToken,
            refreshToken
        };
    };
}