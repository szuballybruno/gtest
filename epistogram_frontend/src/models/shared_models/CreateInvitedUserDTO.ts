export class CreateInvitedUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    organizationId: string;
    role: string;
    jobTitle: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        organizationId: string,
        jobTitle: string,
        role: string) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.organizationId = organizationId;
        this.role = role;
        this.jobTitle = jobTitle;
    }
}