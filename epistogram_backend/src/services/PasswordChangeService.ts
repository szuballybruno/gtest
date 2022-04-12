import { User } from '../models/entity/User';
import { validatePassowrd } from '../shared/logic/sharedLogic';
import { ErrorCode } from '../utilities/helpers';
import { EmailService } from './EmailService';
import { HashService } from './HashService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TokenService } from './TokenService';
import { UrlService } from './UrlService';
import { UserService } from './UserService';

export class PasswordChangeService {

    private _userService: UserService;
    private _tokenService: TokenService;
    private _emailService: EmailService;
    private _urlService: UrlService;
    private _ormService: ORMConnectionService;
    private _config: GlobalConfiguration;
    private _hashService: HashService;

    constructor(
        userService: UserService,
        tokenService: TokenService,
        emailService: EmailService,
        urlService: UrlService,
        ormService: ORMConnectionService,
        config: GlobalConfiguration,
        hashService: HashService) {

        this._hashService = hashService;
        this._ormService = ormService;
        this._config = config;
        this._urlService = urlService;
        this._emailService = emailService;
        this._userService = userService;
        this._tokenService = tokenService;
    }

    /**
     * This will request a passowrd change for a user that's not authenticated, 
     * an email will be sent out with the pw change link.
     * 
     * @param email 
     */
    async requestPasswordChangeAsync(email: string) {

        const user = await this._userService
            .getUserByEmailAsync(email);

        if (!user)
            throw new Error('Can not reset passowrd, user does not exists.');

        const token = this._tokenService
            .createSetNewPasswordToken(user.id);

        // save user's reset token in DB, it's only valid this way
        // some benefits are you can not use the token twice,
        // since it's going to be removed after it's been used  
        await this._ormService
            .getRepository(User)
            .save({
                id: user.id,
                resetPasswordToken: token
            });

        const resetUrl = this._urlService
            .getFrontendUrl(`/set-new-password?token=${token}`);

        await this._emailService
            .sendSelfPasswordResetMailAsync(user, resetUrl);
    }

    /**
     * This will request a passowrd change for a user that's authenticated, 
     * an email will be sent out with the pw change link. 
     * The old password will be requested from the user an an extra safety step. 
     * 
     * @param userId 
     * @param oldPassword 
     */
    requestPasswordChangeAuthenticatedAsync = async (userId: number, oldPassword: string) => {

        const resetPawsswordToken = this._tokenService
            .createSetNewPasswordToken(userId);

        const user = await this._userService
            .getUserById(userId);

        if (!await this._hashService.comparePasswordAsync(oldPassword, user.password))
            throw new ErrorCode('Wrong password!', 'bad request');

        await this._ormService
            .getRepository(User)
            .save({
                id: user.id,
                resetPasswordToken: resetPawsswordToken
            });

        const resetPawsswordUrl = this._config.misc.frontendUrl + `/set-new-password?token=${resetPawsswordToken}`;

        await this._emailService
            .sendResetPasswordMailAsync(user, resetPawsswordUrl);
    };

    /**
     * This will set a new password for the user.
     * 
     * @param password 
     * @param passwordCompare 
     * @param passwordResetToken 
     */
    setNewPasswordAsync = async (
        password: string,
        passwordCompare: string,
        passwordResetToken: string) => {

        // verify new password with compare password 
        if (validatePassowrd(password, passwordCompare))
            throw new ErrorCode('Password is invalid.', 'bad request');

        // verify token
        const tokenPayload = this._tokenService
            .verifySetNewPasswordToken(passwordResetToken);

        const userId = tokenPayload.userId;

        // get user 
        const user = await this._userService
            .getUserById(userId);

        // verify user reset password token
        if (user.resetPasswordToken !== passwordResetToken)
            throw new ErrorCode('Wrong token.', 'bad request');

        // hash new password
        const hashedPassword = await this._hashService
            .hashPasswordAsync(password);

        // save new values 
        await this._ormService
            .getRepository(User)
            .save({
                id: user.id,
                resetPasswordToken: null,
                password: hashedPassword
            } as User);
    };
}