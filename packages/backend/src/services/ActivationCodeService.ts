import generatePassword from 'password-generator';
import { ActivationCode } from '../models/entity/misc/ActivationCode';
import { Id } from '@episto/commontypes';
import { forN } from '../utilities/helpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class ActivationCodeService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    async isValidCodeAsync(code: string) {

        const actCode = await this._ormService
            .query(ActivationCode, {
                code
            })
            .where('code', '=', 'code')
            .and('isUsed', 'IS', 'false')
            .getOneOrNull();

        return actCode;
    }

    async invalidateCodeAsync(codeId: Id<'ActivationCode'>) {

        await this._ormService
            .save(ActivationCode, {
                id: codeId,
                isUsed: true
            });
    }

    async generateActivationCodesAsync(amount: number, companyId: Id<'Company'>) {

        const codes = forN(amount, x => this.genCode());

        await this._ormService
            .createManyAsync(ActivationCode, codes
                .map(x => ({
                    code: x,
                    isUsed: false,
                    companyId: companyId
                } as ActivationCode)));
    }

    private genCode = () => {

        return 'MELO' + generatePassword(8)
            .toUpperCase();
    };
}