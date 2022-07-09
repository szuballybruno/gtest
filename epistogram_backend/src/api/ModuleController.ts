import { ModuleService } from '../services/ModuleService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class ModuleController {

    private _moduleService: ModuleService;

    constructor(serviceProvider: ServiceProvider) {

        this._moduleService = serviceProvider.getService(ModuleService);
    }

    @XControllerAction(apiRoutes.module.getModuleListEditData)
    getModuleListEditAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const courseId = query
            .getValue(x => x.courseId, 'int');

        return this._moduleService
            .getModuleEditDTOsAsync(courseId);
    };
}