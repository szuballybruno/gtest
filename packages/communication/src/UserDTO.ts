import { Id, UserRegistrationStatusType } from '@episto/commontypes';
import { DepartmentDTO } from './DepartmentDTO';

export class UserDTO {
    id: Id<'User'>;
    firstName: string;
    lastName: string;
    companyId: Id<'Company'>;
    email: string;
    phoneNumber: string;
    name: string;
    avatarUrl: string | null;
    department: DepartmentDTO | null;
    username: string;
    registrationStatus: UserRegistrationStatusType;
}