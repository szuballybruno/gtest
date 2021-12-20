import { Box, Flex } from "@chakra-ui/react";
import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { getEventValueCallback } from "../../../static/frontendHelpers";
import { JobTitleDTO } from "../../../models/shared_models/JobTitleDTO";
import { OrganizationDTO } from "../../../models/shared_models/OrganizationDTO";
import { RoleDTO } from "../../../models/shared_models/RoleDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import { UserEditDTO } from "../../../models/shared_models/UserEditDTO";
import { translatableTexts } from "../../../static/translatableTexts";
import { AddFrame } from "../../add_frame/AddFrame";
import { CurrentUserContext } from "../../system/AuthenticationFrame";
import { EpistoSelect } from "../../universal/EpistoSelect";
import { useOrganizations, useJobTitles } from "../../../services/api/miscApiService";
import { EditSection } from "../courses/EditSection";
import { EpistoEntry } from "../../universal/EpistoEntry";

export const roles = [
    {
        name: "admin",
        id: 1,
        optionText: "Adminisztrátor",
    },
    {
        name: "supervisor",
        id: 2,
        optionText: "Vezető",
    },
    {
        name: "user",
        id: 3,
        optionText: "Felhasználó"
    }
];

export const EditUserControl = (props: {
    editDTO: UserEditDTO | null,
    saveUserAsync: (editDTO: UserEditDTO) => Promise<void>
}) => {

    const { editDTO, saveUserAsync } = props;

    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<RoleDTO | null>(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitleDTO | null>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDTO | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);

    const user = useContext(CurrentUserContext) as UserDTO;
    const canSetInvitedUserOrganization = user.userActivity.canSetInvitedUserOrganization;

    const { organizations } = useOrganizations();
    const { jobTitles } = useJobTitles();

    useEffect(() => {

        if (!editDTO)
            return;

        setFirstName(editDTO.firstName);
        setLastName(editDTO.lastName);
        setEmail(editDTO.email);
        setSelectedRole(editDTO.role);
        setSelectedJobTitle(editDTO.jobTitle);
        setSelectedOrganization(editDTO.organization);
    }, [editDTO]);

    const handleSaveUserAsync = async () => {

        const editedUserDTO = {
            id: editDTO?.id,
            firstName,
            lastName,
            email,
            jobTitle: selectedJobTitle,
            organization: selectedOrganization,
            role: selectedRole
        } as UserEditDTO;

        await saveUserAsync(editedUserDTO);
    }

    return <Box px="20px" flex="1" alignItems={"flex-start"} maxW={500}>

        <EditSection
            title={"Új felhasználó hozzáadása"}>

            <Flex direction="column">

                {/* first & last name */}
                <Flex>
                    <EpistoEntry
                        value={firstName}
                        name="fname"
                        setValue={setFirstName}
                        labelVariant={"top"}
                        label="Keresztnév" />

                    <EpistoEntry
                        name="lname"
                        value={lastName}
                        setValue={setLastName}
                        labelVariant={"top"}
                        label="Vezetéknév" />
                </Flex>

                {/* email */}
                <EpistoEntry
                    name="email"
                    value={email}
                    setValue={setEmail}
                    labelVariant={"top"}
                    label="Email" />

                {/* organization */}
                {canSetInvitedUserOrganization && <Flex direction="column" align="stretch" mt="10px" width="100%">
                    <Typography variant={"overline"} style={{ marginTop: "10px" }}>
                        Cég
                    </Typography>
                    <EpistoSelect
                        items={organizations}
                        selectedValue={selectedOrganization}
                        onSelected={setSelectedOrganization}
                        getDisplayValue={x => "" + x?.name}
                        getCompareKey={organization => "" + organization?.id} />
                </Flex>}

                {/* job title */}
                {canSetInvitedUserOrganization && <Flex direction="column" align="stretch" mt="10px" width="100%">
                    <Typography variant={"overline"} style={{ marginTop: "10px" }}>
                        Beosztás
                    </Typography>
                    <EpistoSelect
                        items={jobTitles}
                        selectedValue={selectedJobTitle}
                        onSelected={setSelectedJobTitle}
                        getDisplayValue={jt => "" + jt?.name}
                        getCompareKey={jt => "" + jt?.id} />
                </Flex>}

                {/* role */}
                <Flex direction="column" align="stretch" width="100%">
                    <Typography variant={"overline"} style={{ marginTop: "10px" }}>
                        Jogosultsági kör
                    </Typography>
                    <EpistoSelect
                        selectedValue={selectedRole}
                        items={roles}
                        onSelected={setSelectedRole}
                        getDisplayValue={x => "" + (x as any)?.optionText}
                        getCompareKey={x => "" + x?.id} />
                </Flex>

                {/* submit button */}
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={() => handleSaveUserAsync()}
                    style={{ marginTop: "20px" }}>

                    {translatableTexts.editUserControl.saveUser}
                </Button>

            </Flex>
        </EditSection>
    </Box>
};
