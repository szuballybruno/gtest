import { Pool, QueryResult } from 'pg';
import { getDatabaseConnectionParameters } from '../environment';
import { log } from '../misc/logger';

export type ExecSQLFunctionType = (sql: string, values?: any[]) => Promise<QueryResult<any>>;

export class SQLConnectionService {

    connectToDBAsync = async () => {

        log("Connecting to SQL...");

        const dbConfig = getDatabaseConnectionParameters();

        const pool = new Pool({
            port: dbConfig.port,
            host: dbConfig.host,
            user: dbConfig.username,
            database: dbConfig.databaseName,
            password: dbConfig.password,
        })

        const executeSQLAsync = async (sql: string, values?: any[]) => {

            const results = await pool.query(sql, values);

            return results;
        }

        // test connection
        await executeSQLAsync("CREATE TABLE IF NOT EXISTS public.\"connection_test_table\" (\"columnA\" integer);")

        return {
            executeSQL: executeSQLAsync as ExecSQLFunctionType,
            terminateConnectionAsync: async () => {

                log("Disconnecting SQL...");
                await pool.end();
            }
        }
    }
}