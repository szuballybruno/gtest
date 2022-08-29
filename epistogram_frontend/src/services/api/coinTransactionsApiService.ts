import { QueryService } from '../../static/QueryService';
import { CoinTransactionDTO } from '../../shared/dtos/CoinTransactionDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { usePostDataUnsafe } from '../core/httpClient';
import { Id } from '../../shared/types/versionId';

export const useCoinTransactions = () => {

    const qr = QueryService.useXQuery<CoinTransactionDTO[]>(apiRoutes.coinTransactions.getCoinTransactions);

    return {
        coinTransactions: qr.data ?? [],
        coinTransactionsError: qr.error,
        coinTransactionsStatus: qr.state
    };
};

export const useCoinBalance = () => {

    const qr = QueryService.useXQuery<number>(apiRoutes.coinTransactions.getCoinBalance);

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    };
};

export const useCoinBalanceOfUser = (userId: Id<'User'> | null) => {

    const qr = QueryService.useXQuery<number>(apiRoutes.coinTransactions.getCoinBalanceOfUser, { userId }, !!userId);

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    };
};

export const useGiftCoinsToUser = () => {

    const qr = usePostDataUnsafe<{ amount: number, userId: Id<'User'> }, void>(apiRoutes.coinTransactions.giftCoinsToUser);

    return {
        giftCoinsToUserAsync: qr.postDataAsync,
        giftCoinsToUserState: qr.state
    };
};