import dotenv from 'dotenv';
import { ICookieOptions } from '../../utilities/XTurboExpress/XTurboExpressTypes';
import { log } from './logger';

type EnvironmentType = 'development' | 'production' | 'demo' | 'local';

export type LogScopeType =
    'ORM' |
    'BOOTSTRAP' |
    'ROLLING SESSION' |
    'GIVEN ANSWER' |
    'GENERIC' |
    'TRANSACTION' |
    'TEMPOMAT' |
    'REGISTRATION' |
    'VERSION SAVE' |
    'COINS' |
    'SERVER' |
    'ERROR' |
    'FILE UPLOAD';

export class GlobalConfiguration {

    rootDirectory: string;

    security = {
        secrets: {
            accessTokenSecret: GlobalConfiguration.getEnvConfigEntry('JWT_SIGN_SECRET'),
            refreshTokenSecret: 'dasdmaodwhw8dha7y37iaiyd7sta77aw6eads7yawid',
            regTokenSecret: 'dwafwfawiudaw8d79afya09d3asnklswf87aw0dja9wu8d',
            invitationTokenSecret: 'd42dh9hd23c9283h9f2fj98h23d9ja0jd98jwd989awhd',
            setNewPasswordTokenSecret: 'sdajwd99839d8y9ac9ayw7dya398yd9aysdas'
        },
        tokenLifespans: {
            accessTokenLifespanInS: 2 * 60 * 60, // 2 hours 
            refreshTokenLifespanInS: 72 * 60 * 60, // 72 hours
            setNewPasswordTokenLifespanInS: 8 * 60 * 60, // 8 hours,
            registrationTokenLifespanInS: 127 * 60 * 60, // 127 hours,
            invitationTokenLifespanInS: 127 * 60 * 60, // 127 hours
        },
        gcpStorageAuthCredentials: JSON.parse(`{
            "type": "service_account",
            "project_id": "gifted-country-324010",
            "private_key_id": "45a2d3ae7029f73a1cb0a9f68db034684baf5548",
            "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDcdRB084t/rjca\\ne4nmXK8TR1v1HdWMPKyJVlPa9EjPXjfh/aWCwF2bq2h/KS3F+oOytzr3jftU2bKi\\noYcwB27yJ1CingGdt01S/zgG3+si10JxA+4kr4bj8Gybqdy+9zdA7Cf89uNTL7+l\\n0rJL6+Z2h9nK1FYmkJD2jMZJOenp5FRxscgEVbp5lIcRihik64xli5INRWz95lXL\\nJO33wjehuz13/vXgOfuByc0Am1ZZJA8O7xVbEGBTyIsJ7Bt8vXBztUQ9X1DeshIf\\nk/kARjDzar9l+BcA72lrBd46oUK80GOOAB10pANpadjZVBteISilHR6LGtVN0qET\\ndtBKpPGPAgMBAAECggEANOZqUoX2XWcClfo69uoaoLeo20KTcZlFlZb/fDTOG+Rx\\n6GqjAqMCU05oPss0zqL0YzgQkEKjopKyiM/VzrKZ7sV8VekwXhYUGexgF1Y36B5b\\nNR9KT8dGyP9yMFAsRi6wNYX1eoALwHReun26hvlOTfb/Tepx2cMq5d6V3hBljtfn\\nRogkVDHTyXDGMGkuZEMEGQgaFxGwuyRZpqukvKm6WaO+EyFmlqhiEKAReu9RIzY1\\nFZuLNX23o8OGvNt9B191rEBJmmDcZ4quS6MwKz92H5tWgoxusZSt11WUqssLaNob\\nF/3VqPeiB/gy0UBNoVKEfQq9Ic6zmYl7EmH10ALLMQKBgQD3x6rBV2xpOpsIeTxt\\n82SDOQv+q0NyBsW5werIYt0VB75QKXpcAwUwT69BCSJ/iAaKZbD/WsDMVdBYmlrZ\\njOhyzJeLrLqP2HB58ZfFbrXJtP1/wQqGZBcpSC1CzWBpOBkU8JjRFepxbPHAz//O\\nj07zl6bUTJJB162dzXFRq83BtQKBgQDjxVpLVXWTWYhMRjQYlZH4JTwZJIrrrqtT\\nBoD4F/8qKkgTDytl3mUhQu8MUyQfirQ45xd1mxtetCzVm6WK8wwX/x6q4Ufzxmz/\\nDmmpvtM4u/o4jG3rSQTtzECg4+4mdB6c8l0Ut1NSxBNhbhv2DFHmqUM0Uvt7M8ZT\\nVbKI6LyAswKBgB7tOQ7wzoND4V3pY/WFT6JhWHHtBnoRBlTtM1TXoiih0stGohMh\\n/V/OUl2XukqYu9hCYRk+Rpo6i8rDWVuWDt1lU/UHFjImHcPat8rYyq/me02a1ql3\\njLyGWb/gyovXiKnobeqLBbwqkPI0BAXQNVaKMzSEaiz1sqHjpqU/AGuRAoGAWQqJ\\npfGeqR/THJ5FN2chTTShLeMPO9totmhQeqxG4CDvVCQV/xjVyA72jIbkFECQ+727\\negpMxNUCwe665HrnO2pMftja2/2yFnN38xfaUs+JnhmnztcYyi2TBlKUgwvZ+9jz\\ncmnIdQ6Z1PjKjYF7cwSwdQALt7ohyeoyhTsWlekCgYBmbyjj08Ej2wRiqqWmqnp6\\na8xMJYuPic2UAita5uS5dQbX/8mmfoSVh41h2ywPZOAdzD9RZk1iUJQtmPIfSyAJ\\nkUvn52HdUqhK/+MTKp2TzLH+/4Wr8BrSWVjeLgpv9jCD42Q1gMugYBqyJE2H5Q0r\\nNC8DEguc5E4iaXekP5PErw==\\n-----END PRIVATE KEY-----\\n",
            "client_email": "epistogram-service-account@gifted-country-324010.iam.gserviceaccount.com",
            "client_id": "113272476749962373318",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/epistogram-service-account%40gifted-country-324010.iam.gserviceaccount.com"
        }`)
    };

    cookieOptions: ICookieOptions;

    misc = {
        hostPort: GlobalConfiguration.getEnvConfigEntry('HOST_PORT'),
        environmentName: GlobalConfiguration.getEnvConfigEntry('ENVIRONMENT_NAME'),
        isLocalhost: GlobalConfiguration.getEnvConfigEntry('IS_LOCALHOST', 'bool'),
        domainTemplate: GlobalConfiguration.getEnvConfigEntry('DOMAIN_TEMPLATE'),
        accessTokenCookieName: `epi_access_token_${GlobalConfiguration.getEnvConfigEntry('ENVIRONMENT_NAME')}`,
        refreshTokenCookieName: `epi_refresh_token_${GlobalConfiguration.getEnvConfigEntry('ENVIRONMENT_NAME')}`,
        isUnderMaintanence: GlobalConfiguration.getEnvConfigEntry('IS_UNDER_MAINTENANCE', 'bool'),
        videoCompletedPercentage: GlobalConfiguration.getEnvConfigEntry('VIDEO_COMPLETED_PERCENTAGE', 'int')
    };

    fileStorage = {
        assetStoreUrl: GlobalConfiguration.getEnvConfigEntry('FILE_STORAGE_URL'),
        bucketName: GlobalConfiguration.getEnvConfigEntry('FILE_STORAGE_BUCKET_NAME'),
    };

    mail = {
        mailHost: GlobalConfiguration.getEnvConfigEntry('MAIL_HOST'),
        senderEmail: GlobalConfiguration.getEnvConfigEntry('MAIL_SENDER_MAIL'),
        senderPassword: GlobalConfiguration.getEnvConfigEntry('MAIL_SENDER_PASSWORD')
    };

    database = {
        name: GlobalConfiguration.getEnvConfigEntry('DB_NAME'),
        publicHostAddress: GlobalConfiguration.getEnvConfigEntry('DB_HOST_ADDRESS'),
        gcpCloudSqlConnectionName: 'gifted-country-324010:europe-central2:epistogram',
        port: parseInt(GlobalConfiguration.getEnvConfigEntry('DB_PORT')),
        serviceUserName: GlobalConfiguration.getEnvConfigEntry('DB_SERVICE_USER_NAME'),
        serviceUserPassword: GlobalConfiguration.getEnvConfigEntry('DB_SERVICE_USER_PASSWORD'),
        isOrmLoggingEnabled: GlobalConfiguration.getEnvConfigEntry('DB_IS_ORM_LOGGING_ENABLED', 'bool'),
        isHostedOnGCP: GlobalConfiguration.getEnvConfigEntry('IS_HOSTED_ON_GCP', 'bool'),
    };

    logging = {
        enabledScopes: ['GENERIC', 'VERSION SAVE', 'FILE UPLOAD'] as LogScopeType[],
    };

    practiseQuestions = {
        incorrectQuestionDelayMinutes: 1,
        correctQuestionDelayMinutes: 3,
        incorrectPractiseQuestionDelayMinutes: 5
    };

    questionAnswer = {
        maxQuestionScore: 4,
        correctAnswerScore: 1,
    };

    coinRewardAmounts = {
        questionCorrectAnswer: 1,
        videoWatched: 1,
        answerStreak: {
            shortStreak: {
                length: 5,
                rewardAmount: 5
            },
            longStreak: {
                length: 10,
                rewardAmount: 15
            }
        },
        genericActivity: 10,
        activityStreak3Days: 10,
        activityStreak5Days: 20,
        activityStreak10Days: 50,
    };

    constructor(rootDirectory: string) {

        this.rootDirectory = rootDirectory;

        this.cookieOptions = {
            sameSite: 'strict',
            secure: !this.misc.isLocalhost,
            httpOnly: true,
            domain: '.epistogram.com'
        };
    }

    overrideLogScopes = (scopes: LogScopeType[]) => {

        this.logging.enabledScopes = scopes;
    };

    getIsProdEnvironment = () => {

        const envName = this.misc.environmentName.toLowerCase();
        const isProdEnvironemnt = envName.includes('prod');

        return isProdEnvironemnt;
    };

    getDatabaseConnectionParameters = () => {

        const dbConfig = this.database;
        const isHostedOnGCP = dbConfig.isHostedOnGCP;
        const gcpCloudSqlConnectionString = '/cloudsql/gifted-country-324010:europe-central2:epistogram';

        return {
            host: isHostedOnGCP
                ? gcpCloudSqlConnectionString
                : dbConfig.publicHostAddress,
            port: isHostedOnGCP
                ? undefined
                : dbConfig.port,
            username: dbConfig.serviceUserName,
            password: dbConfig.serviceUserPassword,
            databaseName: dbConfig.name,
            socketPath: isHostedOnGCP
                ? gcpCloudSqlConnectionString
                : undefined
        };
    };

    getRootRelativePath = (path: string) => {

        return this.rootDirectory + path;
    };

    static getEnvConfigEntry(entryName: string): string;
    static getEnvConfigEntry(entryName: string, type: 'bool'): boolean;
    static getEnvConfigEntry(entryName: string, type: 'int'): number;
    static getEnvConfigEntry(entryName: string, type?: 'string' | 'bool' | 'int'): string | boolean | number {

        const fullEntryName = entryName;
        const value = process.env[fullEntryName];

        if (value === '' || value === undefined || value === null)
            throw new Error(`Unable to load .env variable '${fullEntryName}' in env '${GlobalConfiguration.getCurrentEnvironmentName()}'!`);

        /**
         * bool
         */
        if (type === 'bool') {

            if (!(value === 'false' || value === 'true'))
                throw new Error(`Unable to load .env variable ${fullEntryName}. It's not formatted as a boolean.`);

            return value === 'true';
        }

        /**
         * int
         */
        if (type === 'int') {

            const asInt = parseInt(value);

            if (Number.isNaN(asInt))
                throw new Error(`Unable to load .env variable ${fullEntryName}. It's not formatted as a int.`);

            return asInt;
        }

        /**
         * string
         */
        return value;
    }

    static initGlobalConfig = (rootDirectory: string) => {

        log('Environemnt: ' + GlobalConfiguration.getCurrentEnvironmentName());

        log('Loading config.env...');

        dotenv
            .config({ path: 'config/config.env' });

        const globalConfig = new GlobalConfiguration(rootDirectory);

        log(`Started in '${globalConfig.misc.environmentName}' environment!`);

        return globalConfig;
    };

    static getCurrentEnvironmentName = () => {

        return process.env.ENVIRONMENT_NAME as EnvironmentType;
    };
}


