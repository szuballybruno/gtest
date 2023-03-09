import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserRoleView {

    @XViewColumn()
    assignmentBridgeId: Id<'AssignmentBridge'>;

    @XViewColumn()
    contextCompanyId: Id<'ContextCompany'>;

    @XViewColumn()
    contextCompanyName: string;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    roleName: string;

    @XViewColumn()
    assigneeUserId: Id<'AssigneeUser'>;

    @XViewColumn()
    isInherited: boolean;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: string;
}