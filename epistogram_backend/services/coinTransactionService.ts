import { CoinAcquire } from "../models/entity/CoinAcquire";
import { CoinTransactionDTO } from "../models/shared_models/CoinTransactionDTO";
import { CoinBalanceView } from "../models/views/CoinBalanceView";
import { CoinTransactionView } from "../models/views/CoinTransactionView";
import { MapperService } from "./mapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { InsertCoinFnParamsType, SQLFunctionsService } from "./sqlServices/SQLFunctionsService";

export class CoinTransactionService {

    private _funcService: SQLFunctionsService;
    private _mapperService: MapperService;
    private _ormConnectionService: ORMConnectionService;

    constructor(funcService: SQLFunctionsService, ormConnService: ORMConnectionService, mapperService: MapperService) {

        this._funcService = funcService;
        this._mapperService = mapperService;
        this._ormConnectionService = ormConnService;
    }

    async addCoins(insertCoinFnParamsType: InsertCoinFnParamsType) {

        await this._funcService.insertCoinAcquiredFn(insertCoinFnParamsType)
    }

    async getCoinBalance(userId: number) {

        const coinBalance = await this._ormConnectionService
            .getRepository(CoinBalanceView)
            .findOneOrFail({
                where: {
                    userId
                }
            });

        return coinBalance.coinBalance;
    }

    async getCoinTransactionsAsync(userId: number) {

        const coinTransactions = await this._ormConnectionService
            .getRepository(CoinTransactionView)
            .find({
                where: {
                    userId
                }
            });

        return coinTransactions
            .map(x => this._mapperService
                .useMapperFunction(CoinTransactionView, CoinTransactionDTO, x));
    }

    async getCoinsForQuestionAsync(userId: number, questionId: number) {

        return await this._ormConnectionService
            .getRepository(CoinAcquire)
            .createQueryBuilder("ca")
            .leftJoinAndSelect("ca.givenAnswer", "ga")
            .where("ca.userId = :userId", { userId })
            .andWhere("ga.question_id = :questionId", { questionId })
            .andWhere("ca.given_answer_id IS NOT NULL")
            .getMany();
    }

    async getCoinsForActivitySession(userId: number, activitySessionId: number) {

        return await this._ormConnectionService
            .getRepository(CoinAcquire)
            .findOne({
                where: {
                    userId,
                    activitySessionId
                }
            });
    }

    async getCoinsForActivityStreakAsync(userId: number, activityStreakId: number) {

        return await this._ormConnectionService
            .getRepository(CoinAcquire)
            .find({
                where: {
                    userId: userId,
                    activityStreakId
                }
            });
    }

    async getCoinsForAnswerStreakAsync(userId: number, answerStreakId: number) {

        return await this._ormConnectionService
            .getRepository(CoinAcquire)
            .createQueryBuilder("ca")
            .where("ca.userId = :userId", { userId })
            .andWhere("ca.given_answer_streak_id = :gasid", { gasid: answerStreakId })
            .getMany();
    }
}