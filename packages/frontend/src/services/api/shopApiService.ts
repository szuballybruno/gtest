import { CourseShopItemListDTO } from '@episto/communication';
import { IdResultDTO } from '@episto/communication';
import { ShopItemAdminShortDTO } from '@episto/communication';
import { ShopItemBriefData } from '@episto/communication';
import { ShopItemCategoryDTO } from '@episto/communication';
import { ShopItemDTO } from '@episto/communication';
import { ShopItemEditDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';

export const useShopItems = () => {

    const qr = QueryService.useXQuery<ShopItemDTO[]>(apiRoutes.shop.getShopItems);

    return {
        shopItems: qr.data ?? [],
        shopItemsState: qr.state,
        shopItemsError: qr.error,
        refetchShopItems: qr.refetch
    };
};

export const useShopItemCategories = () => {

    const qr = QueryService.useXQuery<ShopItemCategoryDTO[]>(apiRoutes.shop.getShopItemCategories);

    return {
        shopItemCategories: qr.data ?? [],
        shopItemCategoriesState: qr.state,
        shopItemCategoriesError: qr.error
    };
};

export const useAdminShopItems = () => {

    const qr = QueryService.useXQuery<ShopItemAdminShortDTO[]>(apiRoutes.shop.getAdminShopItems);

    return {
        adminShopItems: qr.data ?? [],
        adminShopItemsState: qr.state,
        adminShopItemsError: qr.error
    };
};

export const useShopItemEditData = (shopItemId: Id<'ShopItem'>) => {

    const qr = QueryService.useXQuery<ShopItemEditDTO>(apiRoutes.shop.getShopItemEditData, { shopItemId });

    return {
        shopItemEditData: qr.data,
        shopItemEditDataState: qr.state,
        shopItemEditDataError: qr.error,
        refetchItemEditData: qr.refetch
    };
};

export const useShopItemBriefData = (shopItemId: Id<'ShopItem'> | null) => {

    const qr = QueryService.useXQuery<ShopItemBriefData>(apiRoutes.shop.getShopItemBriefData, { shopItemId }, !!shopItemId);

    return {
        shopItemBriefData: qr.data,
        shopItemBriefDataError: qr.error,
        shopItemBriefDataState: qr.state
    };
};

export const usePrivateCourses = () => {

    const qr = QueryService.useXQuery<CourseShopItemListDTO[]>(apiRoutes.shop.getPrivateCourseList);

    return {
        privateCourses: qr.data ?? [],
        privateCoursesError: qr.error,
        privateCoursesState: qr.state
    };
};

export const usePurchaseShopItem = () => {

    type PurhcaseResultType = {
        discountCode: number | null,
        firstItemCode: string | null
    };

    const qr = usePostDataUnsafe<{ shopItemId: Id<'ShopItem'> }, PurhcaseResultType>(apiRoutes.shop.purchaseShopItem);

    return {
        purchaseShopItemAsync: qr.postDataAsync,
        purchaseShopItemState: qr.state,
        purchaseShopItemResult: qr.result
    };
};

export const useSaveShopItem = () => {

    const qr = usePostMultipartDataUnsafe<ShopItemEditDTO>(apiRoutes.shop.saveShopItem);

    return {
        saveShopItemAsync: (dto: ShopItemEditDTO, file?: File) => qr
            .postMultipartDataAsync({
                data: dto,
                files: file
                    ? { file }
                    : undefined
            }),
        saveShopItemState: qr.state
    };
};

export const useCreateShopItem = () => {

    const qr = usePostDataUnsafe<void, IdResultDTO>(apiRoutes.shop.createShopItem);

    return {
        createShopItemAsync: async () => {
            const res = await qr.postDataAsync();
            return res.id;
        },
        createShopItemState: qr.state
    };
};