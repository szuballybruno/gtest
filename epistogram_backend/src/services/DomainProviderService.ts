import { Company } from '../models/entity/Company';
import { User } from '../models/entity/User';
import { Id } from '../shared/types/versionId';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class DomainProviderService {

    constructor(
        private _ormService: ORMConnectionService,
        private _globalConfig: GlobalConfiguration) {
    }

    async getDomainAsync(userId: Id<'User'>): Promise<string> {

        const user = await this
            ._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        return this.getDomainByCompanyAsync(user.companyId);
    }

    async getDomainByCompanyAsync(companyId: Id<'Company'>): Promise<string> {

        const company = await this
            ._ormService
            .query(Company, { companyId })
            .where('id', '=', 'companyId')
            .getSingle();

        return this.applyTemplate(company.domain);
    }

    async getAllDomainsAsync(): Promise<string[]> {

        const companies = await this
            ._ormService
            .query(Company)
            .getMany();

        const domains = companies
            .map(x => this.applyTemplate(x.domain));

        return domains;
    }

    applyTemplate(domain: string) {

        const token = '[DOMAIN]';
        const template = this._globalConfig.misc.domainTemplate;

        console.log(`Applying CORS template. Token: ${token} Template: ${template}`);

        const res = template.includes(token)
            ? template.replace(token, domain)
            : template;

        console.log(`Final CORS domain with template applied: ${res}`);

        return res;
    }
}