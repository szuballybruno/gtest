import { TeacherInfoEditDTO } from "../models/shared_models/TeacherInfoEditDTO";
import { TeacherInfoService } from "../services/TeacherInfoService";
import { ActionParams } from "../utilities/helpers";

export class TeacherInfoController {

    private _teacherInfoService: TeacherInfoService;

    constructor(teacherInfoService: TeacherInfoService) {

        this._teacherInfoService = teacherInfoService;
    }

    getTeacherInfoAction = async (params: ActionParams) => {

        const userId = params.getQuery<any>().getValue(x => x.userId);

        return await this._teacherInfoService
            .getTeacherInfoEditDTOAsync(userId);
    };

    saveTeacherInfoAction = async (params: ActionParams) => {

        const dto = params.getBody<TeacherInfoEditDTO>();

        return await this._teacherInfoService
            .saveTeacherInfoAsync(dto.data);
    };
}
