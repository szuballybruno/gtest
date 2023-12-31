import { Id } from "@episto/commontypes"

export type BriefUserDataDTO = {
    id: Id<'User'>,
    firstName: string,
    lastName: string,
    fullName: string
}