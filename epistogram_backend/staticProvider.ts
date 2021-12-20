import { CoinAcquireService } from "./services/CoinAcquireService";
import { GlobalConfiguration } from "./services/environment";
import { MapperService } from "./services/MapperService2";
import { DbConnectionService } from "./services/sqlServices/DatabaseConnectionService";
import { ORMConnection } from "./services/sqlServices/ORMConnectionService";
import { SQLBootstrapperService } from "./services/sqlServices/SQLBootstrapper";
import { SQLConnectionService } from "./services/sqlServices/SQLConnectionService";
import { SQLFunctionsService } from "./services/sqlServices/FunctionsService";
import { UserSessionActivityService } from "./services/userSessionActivityService";
import { UserStatsService } from "./services/userStatsService";
import { EmailService } from "./services/EmailService";

export const staticProvider = {

    globalConfig: {} as GlobalConfiguration,
    ormConnection: {} as ORMConnection,
    services: {} as {
        mapperService: MapperService,
        databaseConnectionService: DbConnectionService,
        userStatsService: UserStatsService,
        sqlFunctionService: SQLFunctionsService,
        userSessionActivityService: UserSessionActivityService,
        coinAcquireService: CoinAcquireService,
        sqlBootstrapperService: SQLBootstrapperService,
        sqlConnectionService: SQLConnectionService,
        emailService: EmailService
    },
    rootDirectory: __dirname,
}