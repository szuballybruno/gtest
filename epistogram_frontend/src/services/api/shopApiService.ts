import { CourseBriefData } from "../../models/shared_models/CourseBriefData";
import { CourseShopItemListDTO } from "../../models/shared_models/CourseShopItemListDTO";
import { ShopItemAdminShortDTO } from "../../models/shared_models/ShopItemAdminShortDTO";
import { ShopItemBriefData } from "../../models/shared_models/ShopItemBriefData";
import { ShopItemCategoryDTO } from "../../models/shared_models/ShopItemCategoryDTO";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { ShopItemEditDTO } from "../../models/shared_models/ShopItemEditDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const useShopItems = () => {

    const qr = useReactQuery2<ShopItemDTO[]>(apiRoutes.shop.getShopItems);

    return {
        shopItems: qr.data ?? [],
        shopItemsState: qr.state,
        shopItemsError: qr.error,
        refetchShopItems: qr.refetch
    };
}

export const useShopItemCategories = () => {

    const qr = useReactQuery2<ShopItemCategoryDTO[]>(apiRoutes.shop.getShopItemCategories);

    return {
        shopItemCategories: qr.data ?? [],
        shopItemCategoriesState: qr.state,
        shopItemCategoriesError: qr.error
    };
}

export const useAdminShopItems = () => {

    const qr = useReactQuery2<ShopItemAdminShortDTO[]>(apiRoutes.shop.getAdminShopItems);

    return {
        adminShopItems: qr.data ?? [],
        adminShopItemsState: qr.state,
        adminShopItemsError: qr.error
    };
}

export const useShopItemEditData = (shopItemId: number) => {

    const qr = useReactQuery2<ShopItemEditDTO>(apiRoutes.shop.getShopItemEditData, { shopItemId });

    return {
        shopItemEditData: qr.data,
        shopItemEditDataState: qr.state,
        shopItemEditDataError: qr.error
    };
}

export const useShopItemBriefData = (shopItemId: number | null) => {

    const qr = useReactQuery2<ShopItemBriefData>(apiRoutes.shop.getShopItemBriefData, { shopItemId }, !!shopItemId);

    return {
        shopItemBriefData: qr.data,
        shopItemBriefDataError: qr.error,
        shopItemBriefDataState: qr.state
    }
}

export const usePrivateCourses = () => {

    const qr = useReactQuery2<CourseShopItemListDTO[]>(apiRoutes.shop.getPrivateCourseList);

    return {
        privateCourses: qr.data ?? [],
        privateCoursesError: qr.error,
        privateCoursesState: qr.state
    }
}

export const usePurchaseShopItem = () => {

    const qr = usePostDataUnsafe<{ shopItemId: number }, { discountCode: number }>(apiRoutes.shop.purchaseShopItem);

    return {
        purchaseShopItemAsync: qr.postDataAsync,
        purchaseShopItemState: qr.state,
        purchaseShopItemResult: qr.result
    };
}