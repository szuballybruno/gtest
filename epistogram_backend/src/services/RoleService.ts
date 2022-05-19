import { PermissionAssignmentBridge } from '../models/entity/authorization/PermissionAssignmentBridge';
import { Role } from '../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../models/entity/authorization/RolePermissionBridge';
import { AssignablePermissionView } from '../models/views/AssignablePermissionView';
import { AssignableRoleView } from '../models/views/AssignableRoleView';
import { RoleListView } from '../models/views/RoleListView';
import { UserAssignedAuthItemView } from '../models/views/UserAssignedAuthItemView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { AssignablePermissionDTO } from '../shared/dtos/AssignablePermissionDTO';
import { AssignableRoleDTO } from '../shared/dtos/AssignableRoleDTO';
import { AssignedAuthItemsDTO } from '../shared/dtos/role/AssignedAuthItemsDTO';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { RoleAdminListDTO } from '../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { noUndefined } from '../shared/logic/sharedLogic';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { instatiateInsertEntity } from '../utilities/misc';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class RoleService extends QueryServiceBase<Role> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Role);
    }

    async getRolesListAdminAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const roles = await this._ormService
            .query(RoleListView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return roles
            .groupBy(x => x.roleId)
            .map((grouping): RoleAdminListDTO => {

                const viewAsRole = grouping.first;

                return {
                    roleId: viewAsRole.roleId,
                    roleName: viewAsRole.roleName,
                    ownerName: viewAsRole.ownerName,
                    companyId: viewAsRole.companyId,
                    companyName: viewAsRole.companyName,
                    permissions: grouping
                        .items
                        .map((viewAsPermission): PermissionListDTO => ({
                            code: viewAsPermission.permissionCode,
                            id: viewAsPermission.permissionId,
                            scope: 'USER' // not used 
                        }))
                };
            });
    }

    async getAssignablePermissionsAsync(principalId: PrincipalId, companyId: number) {

        const rolesAndPermissions = await this._ormService
            .query(AssignablePermissionView, { principalId, companyId })
            .where('assigneeUserId', '=', 'principalId')
            .and('contextCompanyId', '=', 'companyId')
            .getMany();

        return rolesAndPermissions
            .map((x): AssignablePermissionDTO => ({
                contextCompanyId: x.contextCompanyId,
                permissionCode: x.permissionCode,
                permissionId: x.permissionId,
                userId: x.assigneeUserId
            }));
    }

    async getAssignableRolesAsync(principalId: PrincipalId, assigneeUserId: number, companyId: number) {

        const roles = await this._ormService
            .query(AssignableRoleView, { principalId, assigneeUserId, companyId })
            .where('assignerUserId', '=', 'principalId')
            .and('assigneeUserId', '=', 'assigneeUserId')
            .and('contextCompanyId', '=', 'companyId')
            .getMany();

        const roleGroups = roles
            .groupBy(x => x.roleId);

        return roleGroups
            .map((viewAsRole): AssignableRoleDTO => ({
                roleId: viewAsRole.first.roleId,
                roleName: viewAsRole.first.roleName,
                contextCompanyName: viewAsRole.first.contextCompanyName,
                ownerCompanyName: viewAsRole.first.ownerCompanyName,
                isCustom: viewAsRole.first.isCustom,
                canAssign: viewAsRole.first.canAssign,
                isAssigned: viewAsRole.first.isAssigned,
                permissionIds: viewAsRole
                    .items
                    .map(viewAsPerm => viewAsPerm.permissionId)
            }));
    }

    async getUserAssignedAuthItemsAsync(userId: PrincipalId, authItemUserId: number): Promise<AssignedAuthItemsDTO> {

        // TODO check permissions of userId

        const views = await this._ormService
            .query(UserAssignedAuthItemView, { authItemUserId })
            .where('assigneeUserId', '=', 'authItemUserId')
            .getMany();

        return {
            assignedPermissionIds: views
                .filter(x => !x.isRole)
                .map(x => x.permissionId!),
            assignedRoleIds: views
                .filter(x => x.isRole)
                .map(x => x.roleId!)
        };
    }

    async saveUserAssignedAuthItemsAsync(principalId: PrincipalId, savedUserId: number, contextCompanyId: number, authItems: AssignedAuthItemsDTO) {

        // TODO authorize userId
        console.log('TODO Auth: ' + principalId);

        // get newly assigned roles 
        const roles = await this.getAssignableRolesAsync(principalId, savedUserId, contextCompanyId);

        const newlyAssignedRoles = roles
            .filter(x => authItems
                .assignedRoleIds
                .any(x.roleId));

        // save permissions
        await this._savePermissionsAsync(
            savedUserId,
            contextCompanyId,
            newlyAssignedRoles,
            authItems.assignedPermissionIds);

        // save roles 
        await this._saveRolesAsync(
            savedUserId,
            contextCompanyId,
            newlyAssignedRoles
                .map(x => x.roleId));
    }

    async _saveRolesAsync(savedUserId: number, contextCompanyId: number, roleIds: number[]) {

        const oldRoleBridges = await this._ormService
            .query(RoleAssignmentBridge, { savedUserId, contextCompanyId })
            .where('contextCompanyId', '=', 'contextCompanyId')
            .and('assigneeUserId', '=', 'savedUserId')
            .getMany();

        await this._ormService
            .hardDelete(RoleAssignmentBridge, oldRoleBridges
                .filter(x => !roleIds.any(x.roleId))
                .map(x => x.id));

        const newBridges = roleIds
            .filter(roleId => !oldRoleBridges
                .any(oldRoleBridge => oldRoleBridge.roleId === roleId))
            .map(roleId => instatiateInsertEntity<RoleAssignmentBridge>({
                roleId: roleId,
                assigneeCompanyId: null,
                assigneeUserId: savedUserId,
                contextCompanyId,
            }));

        await this._ormService
            .createMany(RoleAssignmentBridge, newBridges);
    }

    async _savePermissionsAsync(
        savedUserId: number,
        contextCompanyId: number,
        newlyAssignedRoles: AssignableRoleDTO[],
        permissionIds: number[]) {

        // get newly assigned permission ids 
        const roleContainedPermissionIds = newlyAssignedRoles
            .flatMap(x => x.permissionIds)
            .groupBy(x => x)
            .map(x => x.first);

        const newlyAssignedPermissionIds = permissionIds
            .filter(assignedPermissionId => !roleContainedPermissionIds
                .any(assignedPermissionId));

        // get old permissionIds 
        const oldPermAssBridges = await this._ormService
            .query(PermissionAssignmentBridge, { savedUserId, contextCompanyId })
            .where('assigneeUserId', '=', 'savedUserId')
            .and('contextCompanyId', '=', 'contextCompanyId')
            .getMany();

        const deletedPermissionIds = oldPermAssBridges
            .filter(x => !newlyAssignedPermissionIds
                .any(x.permissionId))
            .map(x => x.id);

        await this._ormService
            .hardDelete(PermissionAssignmentBridge, deletedPermissionIds);

        const newPermBridgeEntities = newlyAssignedPermissionIds
            .filter(x => !oldPermAssBridges
                .any(y => y.permissionId === x))
            .map(x => instatiateInsertEntity<PermissionAssignmentBridge>({
                permissionId: x,
                assigneeUserId: savedUserId,
                assigneeCompanyId: null,
                assigneeGroupId: null,
                contextCompanyId: contextCompanyId,
                contextCourseId: null
            }));

        await this._ormService
            .createMany(PermissionAssignmentBridge, newPermBridgeEntities);
    }

    async getUserPermissionsAsync(userId: number): Promise<PermissionListDTO[]> {

        return [];
    }

    async createRoleAsync(principalId: PrincipalId, dto: RoleCreateDTO) {

        const userId = principalId.toSQLValue();

        // create role
        const role = await this.createAsync(instatiateInsertEntity<Role>({
            name: dto.name,
            companyId: dto.companyId,
            isCustom: dto.isCustom,
            deletionDate: null
        }));

        // create permission assignments 
        const permAssignemnts = dto
            .permissionIds
            .map(x => ({
                permissionId: x,
                roleId: role.id
            } as RolePermissionBridge));

        await this._ormService
            .save(RolePermissionBridge, permAssignemnts);
    }

    async getRoleEditDataAsync(principalId: PrincipalId, roleId: number): Promise<RoleEditDTO> {

        const userId = principalId.toSQLValue();

        type ResultType = {
            roleId: number,
            roleName: string,
            permissionId: number,
            isCustom: boolean,
            companyId: Role['companyId']
        }

        const roles = await this._ormService
            .withResType<ResultType>()
            .query(Role, {
                userId,
                roleId,
                editCoCode: 'EDIT_CUSTOM_ROLES' as PermissionCodeType,
                editGlobCode: 'EDIT_PREDEFINED_ROLES' as PermissionCodeType
            })
            .selectFrom(x => x
                .columns(Role, {
                    roleId: 'id',
                    roleName: 'name',
                    companyId: 'companyId',
                    isCustom: 'isCustom'
                })
                .columns(RolePermissionBridge, {
                    permissionId: 'permissionId'
                }))
            .innerJoin(UserPermissionView, x => x
                .on('assigneeUserId', '=', 'userId')
                .openBracket()
                .and('contextCompanyId', '=', 'companyId', Role)
                .and('permissionCode', '=', 'editCoCode')
                .or('permissionCode', '=', 'editGlobCode')
                .and('contextCompanyId', 'IS', 'NULL')
                .closeBracket())
            .leftJoin(RolePermissionBridge, x => x
                .on('roleId', '=', 'id', Role))
            .where('id', '=', 'roleId')
            .getMany();

        if (roles.none())
            throw new VerboseError('forbidden');

        const group = roles
            .groupBy(x => x.roleId)
            .single(x => true);

        const resultGroupFirst = group.first;

        return {
            roleId: resultGroupFirst.roleId,
            name: resultGroupFirst.roleName,
            companyId: resultGroupFirst.companyId,
            isCustom: resultGroupFirst.isCustom,
            permissionIds: group
                .items
                .map(x => x.permissionId)
        };
    }

    async deleteRoleAsync(principalId: PrincipalId, roleId: number) {

        const userId = principalId.toSQLValue();

        await this._ormService
            .softDelete(Role, [roleId]);
    }

    async saveRoleAsync(principalId: PrincipalId, dto: RoleEditDTO) {

        const userId = principalId.toSQLValue();

        // save role
        const role = await this._ormService
            .query(Role, { roleId: dto.roleId })
            .where('id', '=', 'roleId')
            .getSingle();

        await this._ormService
            .save(Role, [
                noUndefined({
                    id: role.id,
                    name: dto.name,
                    ownerCompanyId: dto.companyId
                })
            ]);

        // save role permission bridges
        await this._ormService
            .getRepository(RolePermissionBridge)
            .createQueryBuilder()
            .delete()
            .from(RolePermissionBridge)
            .where('roleId = :roleId', { roleId: dto.roleId })
            .execute();

        await this._ormService
            .save(RolePermissionBridge, dto
                .permissionIds
                .map(x => ({
                    permissionId: x,
                    roleId: dto.roleId
                })));
    }
}