
type BranchNameType = 'local' | 'main' | 'demo' | 'dev';
type EnvNameType = 'local' | 'prod' | 'demo' | 'dev';
type DomainPrefixType = 'local' | 'app' | 'demo' | 'dev';

export type EnvConfigBaseType = {

    misc: {
        DOMAIN_TEMPLATE: string;
        ENVIRONMENT_NAME: string;
        HOST_PORT: number;
        JWT_SIGN_SECRET: string;
        IS_HOSTED_ON_GCP: boolean;
        IS_LOCALHOST: boolean;
        VIDEO_COMPLETED_PERCENTAGE: number;
    },

    fileStorage: {
        FILE_STORAGE_URL: string;
        FILE_STORAGE_BUCKET_NAME: string;
    },

    mail: {
        MAIL_TOKEN_SECRET: string;
        MAIL_HOST: string;
        MAIL_SENDER_MAIL: string;
        MAIL_SENDER_PASSWORD: string;
    },

    database: {
        DB_NAME: string;
        DB_HOST_ADDRESS: string;
        DB_PORT: string;
        DB_SERVICE_USER_NAME: string;
        DB_SERVICE_USER_PASSWORD: string;
        DB_IS_ORM_LOGGING_ENABLED: boolean;
    },

    gcp: {
        BACKEND_URL: string;
        BRANCH_NAME: BranchNameType;
        MIN_INSTANCE_COUNT: number;
        IS_UNDER_MAINTENANCE: boolean;
    }
};

export type EnvConfigType = EnvConfigBaseType & {
    GEN_ENV_SCRIPT: string;
};

const getSecret = (key: string) => '${{secrets.' + key + '}}';

const secrets = {

    // misc
    JWT_SIGN_SECRET: getSecret('JWT_SIGN_SECRET'),

    // mail
    MAIL_TOKEN_SECRET: getSecret('MAIL_TOKEN_SECRET'),
    MAIL_SENDER_MAIL: getSecret('MAIL_SENDER_MAIL'),
    MAIL_SENDER_PASSWORD: getSecret('MAIL_SENDER_PASSWORD'),

    // DB
    DB_HOST_ADDRESS: getSecret('DB_HOST_ADDRESS'),
    DB_PORT: getSecret('DB_PORT'),
    DB_SERVICE_USER_NAME: getSecret('DB_SERVICE_USER_NAME'),
    DB_SERVICE_USER_PASSWORD: getSecret('DB_SERVICE_USER_PASSWORD'),
}

const getBaseConfig = (
    branchName: BranchNameType,
    domainPrefix: DomainPrefixType,
    envName: EnvNameType,
    override: (config: EnvConfigBaseType) => void): EnvConfigBaseType => {

    const config: EnvConfigBaseType = ({
        gcp: {
            BRANCH_NAME: branchName,
            BACKEND_URL: `api.${domainPrefix}.epistogram.com`,
            MIN_INSTANCE_COUNT: 0,
            IS_UNDER_MAINTENANCE: false,
        },

        misc: {
            DOMAIN_TEMPLATE: `https://${branchName}.$DOMAIN$`,
            ENVIRONMENT_NAME: envName,
            HOST_PORT: 5000,
            JWT_SIGN_SECRET: secrets.JWT_SIGN_SECRET, // 'adsasdsd',
            IS_HOSTED_ON_GCP: true,
            IS_LOCALHOST: false,
            VIDEO_COMPLETED_PERCENTAGE: 5,
        },

        fileStorage: {
            FILE_STORAGE_URL: `https://storage.googleapis.com/epistogram_bucket_${envName}`,
            FILE_STORAGE_BUCKET_NAME: `epistogram_bucket_${envName}`,
        },

        mail: {
            MAIL_TOKEN_SECRET: secrets.MAIL_TOKEN_SECRET, //'AROWILLSAVETHEMAIL',
            MAIL_HOST: 'smtp.sendgrid.net',
            MAIL_SENDER_MAIL: secrets.MAIL_SENDER_MAIL, // 'apikey',
            MAIL_SENDER_PASSWORD: secrets.MAIL_SENDER_PASSWORD, // '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',
        },

        database: {
            DB_NAME: `epistogram_${envName.toUpperCase()}`,
            DB_HOST_ADDRESS: secrets.DB_HOST_ADDRESS, //'34.118.107.79',
            DB_PORT: secrets.DB_PORT, //5432,
            DB_SERVICE_USER_NAME: secrets.DB_SERVICE_USER_NAME, // 'dev_service_user',
            DB_SERVICE_USER_PASSWORD: secrets.DB_SERVICE_USER_PASSWORD, // 'epistogram',
            DB_IS_ORM_LOGGING_ENABLED: true,
        }
    });

    override(config);

    return config;
};

export const environemntConfigs: EnvConfigBaseType[] = [

    // prod
    getBaseConfig('main', 'app', 'prod', config => {

        config.misc.DOMAIN_TEMPLATE = 'http://$DOMAIN$';
        config.gcp.MIN_INSTANCE_COUNT = 1;
    }),

    // demo
    getBaseConfig('demo', 'demo', 'demo', config => {
    }),

    // dev
    getBaseConfig('dev', 'dev', 'dev', config => {
    })
];

export const localConfig = getBaseConfig('local', 'local', 'local', config => {

    config.misc.DOMAIN_TEMPLATE = 'http://localhost:3000';

    config.misc.IS_HOSTED_ON_GCP = false;
    config.misc.IS_LOCALHOST = true;

    config.fileStorage.FILE_STORAGE_BUCKET_NAME = 'epistogram_bucket_dev';
    config.fileStorage.FILE_STORAGE_URL = 'https://storage.googleapis.com/epistogram_bucket_dev';

    config.database.DB_NAME = 'localhostDB';
    config.database.DB_HOST_ADDRESS = 'localhost';
    config.database.DB_PORT = '7014';
    config.database.DB_SERVICE_USER_NAME = 'dev_service_user';
    config.database.DB_SERVICE_USER_PASSWORD = 'epistogram';
    config.database.DB_IS_ORM_LOGGING_ENABLED = false;
});

