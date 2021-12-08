import { DailyTipOccurrence } from "../models/entity/DailyTipOccurrence";
import { JobTitle } from "../models/entity/JobTitle";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { UserDTO } from "../models/shared_models/UserDTO";
import { DailyTipView } from "../models/views/DailyTipView";
import { requestChangePasswordAsync } from "../services/authenticationService";
import { getOrganizationsAsync, getOverviewPageDTOAsync, saveUserDataAsync } from "../services/dataService";
import { toDailyTipDTO } from "../services/mappings";
import { getPractiseQuestionAsync } from "../services/practiseQuestionsService";
import { createRegistrationToken } from "../services/tokenService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class MiscController {

    constructor() {

    }

    getCurrentCourseItemCodeAction = async (parms: ActionParams) => {

        const currentBridge = await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .findOne({
                where: {
                    isCurrent: true,
                    userId: parms.userId
                }
            });

        if (!currentBridge)
            return null;

        return currentBridge.currentItemCode;
    };

    getOverviewPageDTOAction = async (params: ActionParams) => {

        return getOverviewPageDTOAsync(params.userId);
    }

    getOrganizationsAction = (params: ActionParams) => {

        return getOrganizationsAsync(params.userId);
    }

    getJobTitlesAction = async (params: ActionParams) => {

        return await staticProvider
            .ormConnection
            .getRepository(JobTitle)
            .find();
    };

    getRegistrationLinkAction = async (params: ActionParams) => {

        return Promise.resolve(`${staticProvider.globalConfig.misc.frontendUrl}/registration?token=${createRegistrationToken()}`);
    };

    requestChangePasswordAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<any>(params.req.body);
        const oldPassword = withValueOrBadRequest<string>(dto.oldPassword);

        return await requestChangePasswordAsync(params.userId, oldPassword);
    };

    saveUserDataAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<UserDTO>(params.req.body);

        return saveUserDataAsync(params.userId, dto);
    };

    getPractiseQuestionAction = async (params: ActionParams) => {

        return await getPractiseQuestionAsync(params.userId);
    };

    getDailyTipAction = async (params: ActionParams) => {

        const dailyTipViews = await staticProvider
            .ormConnection
            .getRepository(DailyTipView)
            .find();

        // filter for todays tip,
        // if it's found, there is no need to do anything else, just return it
        const todaysTip = dailyTipViews.firstOrNull(x => x.isCurrentTip);
        if (todaysTip)
            return toDailyTipDTO(todaysTip);

        // first is used here since the tips are in order of relevance
        const newCurrentTip = dailyTipViews.first(x => true);

        // insert new occurrence, this sets it as current in the DB as well
        await staticProvider
            .ormConnection
            .getRepository(DailyTipOccurrence)
            .insert({
                dailyTipId: newCurrentTip.dailyTipId
            });

        return toDailyTipDTO(newCurrentTip);
    };
}