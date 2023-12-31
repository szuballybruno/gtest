import { IXGatewayController } from "@episto/x-gateway";
import { ActionParams } from "../helpers/ActionParams";

export type IController<T> = IXGatewayController<T, ActionParams>;