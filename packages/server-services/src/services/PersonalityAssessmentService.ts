import { DailyTip } from '../models/tables/DailyTip';
import { PersonalityTraitCategory } from '../models/tables/PersonalityTraitCategory';
import { PersonalityAssessmentDTO } from '@episto/communication';
import { PersonalityCategoryTraitDTO } from '@episto/communication';
import { PersonalityChartDataDTO } from '@episto/communication';
import { PersonalityTraitCategoryDTO } from '@episto/communication';
import { PersonalityTraitCategoryShortDTO } from '@episto/communication';
import { PersonalityTraitDataDTO } from '@episto/communication';
import { PersonalityTraitCategoryView } from '../models/views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from '../models/views/PersonalityTraitView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { PrincipalId } from '@episto/x-core';
import { Id } from '@episto/commontypes';
import { AuthorizationService } from './AuthorizationService';

export class PersonalityAssessmentService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService, authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
    }

    /**
     * Returns the personality assessment DTO, that can be used externally.
     */
    async getUserPersonalityAssessmentDTOAsync(principalId: PrincipalId) {

        const userIdAsIdType = Id.create<'User'>(principalId.toSQLValue());

        const chartData = await this.getUserPersonalityDataAsync(userIdAsIdType);
        const personalityTraitCategories = await this.getPersonalityDescriptionsDTOAsync(userIdAsIdType);

        return {
            chartData: chartData,
            personalityTraitCategories
        } as PersonalityAssessmentDTO;
    }

    /**
     * Returns personality trait views for a specified user
     */
    async getPersonalityTraitsAsync(userId: Id<'User'>) {

        return await this._ormService
            .query(PersonalityTraitView, { userId })
            .where('userId', '=', 'userId')
            .getMany();
    }

    /**
     * Return the personality trait category with details, like tips etc.
     */
    async getPersonalityTraitCategoryDetailsAsync(principalId: PrincipalId, personalityTraitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean) {

        const category = await this._ormService
            .query(PersonalityTraitCategory, { personalityTraitCategoryId })
            .where('id', '=', 'personalityTraitCategoryId')
            .getSingle();

        const tips = await this._ormService
            .query(DailyTip, { isMax, personalityTraitCategoryId })
            .where('isMax', '=', 'isMax')
            .and('personalityTraitCategoryId', '=', 'personalityTraitCategoryId')
            .getMany();

        return this._mapperService
            .mapTo(PersonalityTraitCategoryDTO, [category, tips]);
    }

    /**
     * Returns all of the personality trait categories.
     * Expanded, so in the return data one category will 
     * be split to 2 objects, min <> max value
     */
    async getPersonalityTraitCategoriesAsync(principalId: PrincipalId) {

        const categories = await this._ormService
            .query(PersonalityTraitCategoryView)
            .getMany();

        const minMaxCatList = categories
            .flatMap(category => {

                const minCat = this._mapperService
                    .mapTo(PersonalityTraitCategoryShortDTO, [category, false]);

                const maxCat = this._mapperService
                    .mapTo(PersonalityTraitCategoryShortDTO, [category, true]);

                return [minCat, maxCat];
            });

        return minMaxCatList;
    }

    /**
     * This returns the active descriptions of the users traits. 
     */
    private getPersonalityDescriptionsDTOAsync = async (userId: Id<'User'>) => {

        const personalityTraits = await this.getPersonalityTraitsAsync(userId);

        return personalityTraits
            .map(x => ({
                activeDescription: x.activeDescription,
                categoryTitle: x.traitCategoryTitle
            }) as PersonalityCategoryTraitDTO);
    };

    /**
     * This is a specialized function that 
     * pre-generates the data for a circular (radar) chart.
     * What it does is creates a virtual circle consisting of opposing traits,
     * on opposing sides. Like so: 
     *
     * Trait 1 min - *     * - Trait 1 max
     *                *  * - Trait 2 max
     */
    private async getUserPersonalityDataAsync(userId: Id<'User'>) {

        const categoryViews = await this.getPersonalityTraitsAsync(userId);
        const traits = [] as PersonalityTraitDataDTO[];
        const offset = categoryViews.length;

        categoryViews
            .forEach((categoryView, index) => {

                traits
                    .push({
                        traitName: categoryView.minLabel,
                        orderIndex: index,
                        traitScore: categoryView.minScore
                    });

                traits
                    .push({
                        traitName: categoryView.maxLabel,
                        orderIndex: index + offset,
                        traitScore: categoryView.maxScore
                    });
            });

        const traitsOrdered = traits
            .orderBy(x => x.orderIndex);

        return {
            traits: traitsOrdered
        } as PersonalityChartDataDTO;
    }
}