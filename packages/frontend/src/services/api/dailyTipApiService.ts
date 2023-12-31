import { DailyTipDTO } from '@episto/communication';
import { DailyTipEditDataDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const useDailyTip = () => {

    const qr = QueryService.useXQuery<DailyTipDTO>(apiRoutes.dailyTip.getDailyTip);

    return {
        dailyTipData: qr.data,
        dailyTipError: qr.error,
        dailyTipState: qr.state
    };
};

export const useDailyTipEditData = (dailyTipId: Id<'DailyTip'>) => {

    const qr = QueryService.useXQuery<DailyTipEditDataDTO>(apiRoutes.dailyTip.getDailyTipEditData, { dailyTipId });

    return {
        dailyTipEditData: qr.data,
        dailyTipEditError: qr.error,
        dailyTipEditState: qr.state
    };
};

export const useSaveDailyTip = () => {

    const qr = usePostDataUnsafe<DailyTipEditDataDTO, void>(apiRoutes.dailyTip.saveDailyTip);

    return {
        saveDailyTipAsync: qr.postDataAsync,
        saveDailyTipState: qr.state,
    };
};

export const useCreateDailyTip = () => {

    const qr = usePostDataUnsafe<{ personalityTraitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean }, void>(apiRoutes.dailyTip.createDailyTip);

    return {
        createDailyTipAsync: qr.postDataAsync,
        createDailyTipState: qr.state
    };
};

export const useDeleteDailyTip = () => {

    const qr = usePostDataUnsafe<{ dailyTipId: Id<'DailyTip'> }, void>(apiRoutes.dailyTip.deleteDailyTip);

    return {
        deleteDailyTipAsync: qr.postDataAsync,
        deleteDailyTipState: qr.state
    };
};