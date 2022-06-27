import express, { Application, NextFunction, Request, Response } from 'express';
import { LoggerService } from '../../services/LoggerService';
import { ConstructorSignature } from '../../services/misc/advancedTypes/ConstructorSignature';
import { log, logSecondary } from '../../services/misc/logger';
import { ORMConnectionService } from '../../services/ORMConnectionService/ORMConnectionService';
import { SQLConnectionService } from '../../services/sqlServices/SQLConnectionService';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { ServiceProvider } from '../../startup/servicesDI';
import { ActionParams } from '../ActionParams';
import { ITurboExpressLayer } from './ITurboExpressLayer';
import { getControllerActionMetadatas } from './XTurboExpressDecorators';

export interface ITurboMiddlewareInstance<TInParams, TOutParams> {

    runMiddlewareAsync: (params: MiddlewareParams<TInParams>) => Promise<TOutParams>;
}

export interface ITurboMiddleware<TInParams, TOutParams>
    extends ITurboExpressLayer<ITurboMiddlewareInstance<TInParams, TOutParams>> {
}

export interface IRouteOptions {
    isPost?: boolean
}

export type MiddlewareParams<TInParams> = {
    req: Request;
    res: Response;
    options: EndpointOptionsType;
    inParams: TInParams;
};

export type ApiActionType<TActionParams> = (params: TActionParams) => Promise<any>;

export class EndpointOptionsType implements IRouteOptions {
    isPublic?: boolean;
    isPost?: boolean;
    isMultipart?: boolean;
    isUnauthorized?: boolean;
    checkPermission?: PermissionCodeType;
}

type MiddlwareFnType = (req: any, res: any, next: any) => void;

export type GetServiceProviderType = () => Promise<ServiceProvider>;

export class TurboExpressBuilder<TActionParams> {

    private _port: string;
    private _middlewares: ITurboMiddleware<any, any>[];
    private _onError: (e: any, req: Request, res: Response) => void;
    private _onSuccess: (value: any, req: Request, res: Response) => void;
    private _expressMiddlewares: MiddlwareFnType[];
    private _controllers: ITurboExpressLayer[];
    private _serviceCreationFunction: GetServiceProviderType;

    constructor(private _loggerService: LoggerService) {

        this._middlewares = [];
        this._expressMiddlewares = [];
        this._controllers = [];
    }

    setServicesCreationFunction(createServices: GetServiceProviderType) {

        this._serviceCreationFunction = createServices;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setPort'>;
    }

    setPort(port: string) {

        this._port = port;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setErrorHandler'>;
    }

    setErrorHandler(onError: (e: any, req: Request, res: Response) => void) {

        this._onError = onError;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setSuccessHandler'>;
    }

    setSuccessHandler(onSuccess: (value: any, req: Request, res: Response) => void) {

        this._onSuccess = onSuccess;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setTurboMiddleware'>;
    }

    setTurboMiddleware<TInParams, TOutParams>(middleware: ITurboMiddleware<TInParams, TOutParams>):
        Pick<TurboExpressBuilder<TActionParams>, 'setTurboMiddleware' | 'addController' | 'setExpressMiddleware'> {

        this._middlewares
            .push(middleware);

        return this;
    }

    setExpressMiddleware(middleware: MiddlwareFnType): Pick<TurboExpressBuilder<TActionParams>, 'addController' | 'setExpressMiddleware'> {

        this._expressMiddlewares
            .push(middleware);

        return this;
    }

    addController(signature: ITurboExpressLayer): Pick<TurboExpressBuilder<TActionParams>, 'build' | 'addController'> {

        this._controllers
            .push(signature);

        return this;
    }

    build() {

        const turboExpress = new TurboExpress<TActionParams>(
            this._loggerService,
            this._middlewares,
            this._expressMiddlewares,
            this._port,
            this._serviceCreationFunction,
            this._onError,
            this._onSuccess);

        this._controllers
            .forEach((sign) => {

                const controllerMetadatas = getControllerActionMetadatas(sign);

                log(`Controller: ${sign.name}`);

                controllerMetadatas
                    .orderBy(meta => meta.metadata.isPost + '')
                    .forEach(meta => {

                        const path = meta.metadata.path;

                        logSecondary(`Adding endpoint ${meta.metadata.isPost ? '[POST]' : '[GET] '} ${path}`);

                        turboExpress
                            .addAPIEndpoint(path, sign, meta.propName, meta.metadata);
                    });
            });

        return turboExpress;
    }
}

export class TurboExpress<TActionParams extends IRouteOptions> {

    private _expressServer: Application;

    constructor(
        private _loggerService: LoggerService,
        private _middlewares: ITurboMiddleware<any, any>[],
        private expressMiddlewares: MiddlwareFnType[],
        private _port: string,
        private _getServiceProviderAsync: GetServiceProviderType,
        private _onError: (e: any, req: Request, res: Response) => void,
        private _onSuccess: (value: any, req: Request, res: Response) => void,
        private _onListen?: () => void) {

        this._expressServer = express();

        expressMiddlewares
            .forEach(x => this._expressServer
                .use(x));
    }

    addAPIEndpoint = (
        path: string,
        controllerSignature: ITurboExpressLayer,
        functionName: string,
        options?: EndpointOptionsType) => {

        const runMiddlewaresAsync = async (req: Request, res: Response, serviceProvider: ServiceProvider) => {

            // run middlewares 
            let prevMiddlewareParam: any = {};

            for (let index = 0; index < this._middlewares.length; index++) {

                const middlewareSignature = this._middlewares[index];

                const middlewareInstance = new middlewareSignature(serviceProvider);

                prevMiddlewareParam = await middlewareInstance
                    .runMiddlewareAsync({
                        req,
                        res,
                        options: options ?? {},
                        inParams: prevMiddlewareParam
                    });
            }

            if (!prevMiddlewareParam)
                throw new Error('Invalid middleware configuration, controller action params is null.');

            return prevMiddlewareParam;
        }

        const executeControllerAction = async (actionParams: TActionParams, serviceProvider: ServiceProvider) => {

            const controllerInstance = new controllerSignature(serviceProvider);

            const controllerAction: ApiActionType<TActionParams> = controllerInstance[functionName];

            // run action 
            return await controllerAction(actionParams);
        }

        // async api action handler 
        const asyncStuff = async (req: Request, res: Response, next: NextFunction) => {

            this._loggerService
                .log(`${req.path}: REQUEST ARRIVED`);

            // Instatiate all services, 
            // establish connection to DB
            const serviceProvider = await this._getServiceProviderAsync();

            const ormService = serviceProvider
                .getService(ORMConnectionService);

            const sqlService = serviceProvider
                .getService(SQLConnectionService);

            // BEGIN
            await ormService
                .beginTransactionAsync();

            try {

                const actionParams = await runMiddlewaresAsync(req, res, serviceProvider);
                const controllerActionReturnValue = await executeControllerAction(actionParams, serviceProvider);

                // COMMIT
                await ormService
                    .commitTransactionAsync();

                return controllerActionReturnValue;
            }
            catch (e: any) {

                // COMMIT
                await ormService
                    .rollbackTransactionAsync();

                throw e;
            }
            finally {

                sqlService
                    .releaseConnectionClient();
            }
        };

        // create sync wrapper
        const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

            asyncStuff(req, res, next)
                .then((returnValue: any) => {

                    this._onSuccess(returnValue, req, res);
                })
                .catch((error: any) => {

                    this._onError(error, req, res);
                });
        };

        // register on express as route 
        if (options?.isPost) {

            this._expressServer.post(path, syncActionWrapper);
        } else {

            this._expressServer.get(path, syncActionWrapper);
        }
    };

    listen() {

        this._expressServer
            .listen(this._port, this._onListen);
    }
}