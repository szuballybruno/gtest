import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class RoleListView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    userEmail: string;

    @XViewColumn()
    ownerCompanyId: Id<'Company'>;

    @XViewColumn()
    isDeleted: boolean;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    roleName: string;

    @XViewColumn()
    ownerName: string;

    @XViewColumn()
    permissionId: Id<'Permission'>;

    @XViewColumn()
    permissionCode: string;
}