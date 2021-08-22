import { User } from "../models/entities/User";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../models/shared_models/FinalizeUserRegistrationDTO";
import { IdType, InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { globalConfig } from "../server";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { hashPasswordAsync } from "./crypt";
import { sendInvitaitionMailAsync } from "./emailService";
import { getJWTToken, verifyJWTToken } from "./jwtGen";
import { useCollection } from "./persistance";
import { getUserByEmail, getUserById } from "./userService";

export const createInvitedUserAsync = async (dto: CreateInvitedUserDTO, currentUserId: IdType) => {

    const currentUser = await getUserById(currentUserId);

    // get and check sent data 
    const email = withValueOrBadRequest(dto.email);
    const role = withValueOrBadRequest(dto.role);
    const firstName = withValueOrBadRequest(dto.firstName);
    const lastName = withValueOrBadRequest(dto.lastName);
    const jobTitle = withValueOrBadRequest(dto.jobTitle);
    const userFullName = `${lastName} ${firstName}`;

    // if user is admin require organizationId to be provided
    // otherwise use the current user's organization
    const organizationId = currentUser.userData.role === "admin"
        ? withValueOrBadRequest(dto.organizationId)
        : currentUser.userData.organizationId;

    // does user already exist?
    const existingUser = await getUserByEmail(email);
    if (existingUser)
        throw new TypedError("User already exists.", "bad request");

    // hash user password 
    const hashedDefaultPassword = await hashPasswordAsync("guest");

    // insert new user 
    const { insertItem } = await useCollection("users");

    const newUser = {
        userData: {
            active: true,
            email: email,
            role: role,
            firstName: firstName,
            lastName: lastName,
            organizationId: organizationId,
            password: hashedDefaultPassword,
            innerRole: jobTitle
        }
    } as User;

    const insertResults = await insertItem(newUser);
    const userId = insertResults.insertedId;

    // send invitaion mail
    const invitationToken = getJWTToken(
        { userId: userId } as InvitationTokenPayload,
        globalConfig.mail.tokenMailSecret,
        "24h");

    await sendInvitaitionMailAsync(invitationToken, email, userFullName);
}

export const finalizeUserRegistrationAsync = async (invitationToken: string, dto: FinalizeUserRegistrationDTO) => {

    const tokenPayload = verifyJWTToken<InvitationTokenPayload>(invitationToken, globalConfig.mail.tokenMailSecret);
    if (!tokenPayload)
        throw new TypedError("Invitation token is invalid or expired!", "forbidden");

    if (dto.password != dto.controlPassword)
        throw new TypedError("Passwords are not equal!", "bad request");

    const { updateAsync } = await useCollection("users");

    // hash password
    const hashedPassword = await hashPasswordAsync(dto.password);

    await updateAsync(tokenPayload.userId, {
        "userData.phoneNumber": dto.phoneNumber,
        "userData.password": hashedPassword
    });
}