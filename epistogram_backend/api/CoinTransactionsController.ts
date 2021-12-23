import { CoinTransactionService } from "../services/CoinTransactionService";
import { ActionParams } from "../utilities/helpers";

export class CoinTransactionsController {

    private _coinTransactionService: CoinTransactionService;

    constructor(cts: CoinTransactionService) {

        this._coinTransactionService = cts;
    }

    getCoinTransactionsAction = async (params: ActionParams) => {

        return this._coinTransactionService
            .getCoinTransactionsAsync(params.currentUserId);
    }

    getCoinBalanceAction = async (params: ActionParams) => {

        return this._coinTransactionService.getCoinBalance(params.currentUserId);
    }
}