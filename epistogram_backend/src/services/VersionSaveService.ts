import { Mutation } from '../shared/dtos/mutations/Mutation';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { log } from './misc/logger';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { EntityType } from './XORM/XORMTypes';

type SaveActionType = {
    mutation: Mutation<any, any> | null;
    oldVersionId: number;
    action: 'ADD' | 'UPDATE' | 'INCREMENT';
}

export class VersionSaveService {

    constructor(
        private _ormService: ORMConnectionService) {
    }

    /**
     * SAVE
     */
    async saveAsync<TDTO, TMutationKey extends keyof TDTO, TVersion extends EntityType, TData extends EntityType, TEntity extends EntityType>(opts: {
        dtoSignature: ClassType<TDTO>,
        versionSignature: ClassType<TVersion>,
        dataSignature: ClassType<TData>,
        entitySignature: ClassType<TEntity>,
        parentVersionIdField: keyof TVersion,
        parentVersionIdFieldInDTO: keyof TDTO,
        parentVersionIdMigrations: VersionMigrationResult[],
        muts: Mutation<TDTO, TMutationKey>[],
        getDataId: (version: TVersion) => number,
        getEntityId: (version: TVersion) => number,
        getVersionId: (mutation: Mutation<TDTO, TMutationKey>) => number,
        getDefaultData: (mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TData>,
        overrideDataProps: (data: InsertEntity<TData>, mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TData>,
        getNewEntity: (mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TEntity>,
        getNewVersion: (opts: { newDataId: number, entityId: number, newParentVersionId: number }) => InsertEntity<TVersion>
    }) {

        const {
            muts,
            parentVersionIdMigrations,
            dtoSignature,
            versionSignature,
            dataSignature,
            entitySignature,
            parentVersionIdField,
            parentVersionIdFieldInDTO,
            getDataId,
            getDefaultData,
            getEntityId,
            getVersionId,
            getNewEntity,
            getNewVersion,
            overrideDataProps
        } = opts;

        this._log(`Saving ${entitySignature.name}...`);

        // get all old versions of parent 
        const oldVersions = await this
            ._getAllOldVersionsByParent(
                versionSignature,
                parentVersionIdField,
                parentVersionIdMigrations,
                muts,
                getVersionId);

        // get old verison ids 
        const { oldVersionIds } = this
            ._getOldVersionIds(muts, oldVersions, getVersionId);

        // get old data
        const { getOldData } = await this
            ._getOldDataView({
                data: dataSignature,
                entity: entitySignature,
                oldVersions,
                getDataId,
                getEntityId,
                getVersionId
            });

        // mutations
        const mutaitonsOrdered = muts
            .filter(x => x.action !== 'delete')
            .orderBy(x => x.action === 'add' ? 1 : 2);

        // get increment save actions
        const incrementSaveActions = oldVersionIds
            .filter(oldVersionId => !mutaitonsOrdered
                .some(mut => getVersionId(mut) === oldVersionId))
            .map(oldVersionId => ({ oldVersionId }));

        //
        // CREATE VIDEO DATAS
        const newDatas = mutaitonsOrdered
            .map((mutation) => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getOldData(mutation).oldData
                    : getDefaultData(mutation);

                return overrideDataProps(defaultData, mutation);
            });

        const dataIds = await this._ormService
            .createManyAsync(dataSignature, newDatas);

        //
        // CREATE ENTITES (FROM ADD MUTATIONS ONLY)
        const newEntities = mutaitonsOrdered
            .filter(x => x.action === 'add')
            .map(getNewEntity);

        const newEntityIds = await this._ormService
            .createManyAsync(entitySignature, newEntities);

        //
        // CREATE VERSIONS 
        const saveActions = mutaitonsOrdered
            .map(x => ({
                mutation: x,
                oldVersionId: getVersionId(x),
                action: x.action === 'add' ? 'ADD' : 'UPDATE'
            }) as SaveActionType)
            .concat(incrementSaveActions
                .map(x => ({
                    mutation: null,
                    oldVersionId: x.oldVersionId,
                    action: 'INCREMENT'
                } as SaveActionType)));

        const newVersions = saveActions
            .map(({ mutation, oldVersionId }, i) => {

                // if no mutation (increment) use old
                // ELSE use new
                const newDataId = mutation
                    ? dataIds[i]
                    : getOldData(oldVersionId).oldData.id;

                // if no mutation (increment) OR mutation is update, 
                // use exisitng entity id
                // ELSE use new entity id
                const entityId = !mutation || mutation.action === 'update'
                    ? getOldData(oldVersionId).oldEntity.id
                    : newEntityIds[i];

                // new entity: mutation has parent version id 
                // otherwise use mutation or old data (mutation is priorized)
                const oldParentVersionId: number = ((): number => {

                    if (!mutation)
                        return getOldData(oldVersionId).oldVersion[parentVersionIdField] as any;

                    if (mutation.action === 'add')
                        return XMutatorHelpers.getFieldValueOrFail(mutation)(parentVersionIdFieldInDTO) as any as number;

                    const oldParentVersionId = XMutatorHelpers.getFieldValue(mutation)(parentVersionIdFieldInDTO) as any as number;
                    if (oldParentVersionId)
                        return oldParentVersionId;

                    return getOldData(oldVersionId).oldVersion[parentVersionIdField] as any
                })();

                const newParentVersionId = VersionMigrationHelpers
                    .getNewVersionId(parentVersionIdMigrations, oldParentVersionId);

                return getNewVersion({
                    entityId,
                    newDataId,
                    newParentVersionId
                });
            });

        const newVersionIds = await this._ormService
            .createManyAsync(versionSignature, newVersions);

        const res = VersionMigrationHelpers
            .create(oldVersionIds, newVersionIds);

        this._log(res
            .map((x, i) => `${x.oldVersionId} -> ${x.newVersionId} [${saveActions[i].action}]`).join('\n'));

        this._log(`Saved ${entitySignature.name}.`);

        return res;
    }

    /**
     * Get old versions  
     */
    private async _getAllOldVersionsByParent<TVersion extends EntityType>(
        versionSignature: ClassType<TVersion>,
        parentVersionIdField: keyof TVersion,
        parentVersionIdMigrations: VersionMigrationResult[],
        mutations: Mutation<any, any>[],
        getVersionId: (mutation: Mutation<any, any>) => number) {

        const oldParentVersionIds = parentVersionIdMigrations
            .map(x => x.oldVersionId);

        const oldVersions = await this._ormService
            .query(versionSignature, { oldParentVersionIds })
            .where(parentVersionIdField, '=', 'oldParentVersionIds')
            .getMany();

        const delMutations = mutations
            .filter(x => x.action === 'delete');

        const nonDeleted = oldVersions
            .filter(oldVer => !delMutations
                .some(delMut => getVersionId(delMut) === oldVer.id))

        return nonDeleted;
    }

    /**
     * Get item old data 
     */
    private async _getOldDataView<
        TMutation extends Mutation<any, any>,
        TVersion extends EntityType,
        TData extends EntityType,
        TEntity extends EntityType>(opts: {
            data: ClassType<TData>,
            entity: ClassType<TEntity>,
            oldVersions: TVersion[],
            getDataId: (version: TVersion) => number,
            getEntityId: (version: TVersion) => number,
            getVersionId: (mut: TMutation) => number
        }) {

        const { data, entity, getDataId, getEntityId, getVersionId, oldVersions } = opts;

        const oldData: OldData<TVersion, TData, TEntity>[] = oldVersions.length === 0
            ? [] as OldData<TVersion, TData, TEntity>[]
            : await (async () => {

                const oldDataIds = oldVersions.map(getDataId);
                const oldEntityIds = oldVersions.map(getEntityId);

                const oldDatas = await this._ormService
                    .query(data, { oldDataIds })
                    .where('id', '=', 'oldDataIds')
                    .getMany();

                const oldVideos = await this._ormService
                    .query(entity, { oldEntityIds })
                    .where('id', '=', 'oldEntityIds')
                    .getMany();

                const oldData = oldVersions
                    .map((ver) => ({
                        oldVersion: ver,
                        oldData: oldDatas.single(data => data.id === getDataId(ver)),
                        oldEntity: oldVideos.single(ent => ent.id === getEntityId(ver))
                    } as OldData<TVersion, TData, TEntity>));

                return oldData;
            })();

        const getOldData = (mutation: TMutation | number) => {

            const verisonId = typeof mutation === 'number'
                ? mutation
                : getVersionId(mutation);

            return oldData
                .single(x => x.oldVersion.id === verisonId);
        };

        return { getOldData };
    }

    /**
     * get old version ids 
     */
    private _getOldVersionIds<TMutation extends Mutation<any, any>>(
        mutations: TMutation[],
        oldVersions: EntityType[],
        getVersionId: (mut: TMutation) => number) {

        const addMutationOldVersionIds = mutations
            .filter(x => x.action === 'add')
            .map(x => getVersionId(x));

        const oldVersionIds = addMutationOldVersionIds
            .concat(oldVersions.map(x => x.id));

        return { oldVersionIds };
    }

    /**
     * Log
     */
    private _log(text: string) {

        log(text, { noStamp: true });
    }
}