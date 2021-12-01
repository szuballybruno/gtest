import { readFileSync, writeFileSync } from "fs";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { dbSchema } from "./services/misc/dbSchema";
import { User } from "./models/entity/User";
import { seedDB } from "./services/dbSeedService";
import { getDatabaseConnectionParameters } from "./services/environment";
import { log, logObject } from "./services/misc/logger";
import { connectToDBAsync } from "./services/sqlServices/SQLConnectionService";
import { recreateFunctionsAsync } from "./services/sqlServices/sqlFunctionCreatorService";
import { recreateViewsAsync } from "./services/sqlServices/sqlViewCreatorService";
import { staticProvider } from "./staticProvider";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
