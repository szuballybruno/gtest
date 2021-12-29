import { Box, Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Typography } from "@mui/material";
import React, { useState } from 'react';
import { useRequestPasswordChange } from "../../services/api/passwordChangeApiService";
import { showNotification, useShowErrorDialog } from "../../services/core/notifications";
import { getEventValueCallback } from "../../static/frontendHelpers";
import { EpistoDialog, EpistoDialogLogicType } from "../EpistoDialog";
import { EpistoHeader } from "../EpistoHeader";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoLabel } from "../universal/EpistoLabel";
import { FlexFloat } from "../universal/FlexFloat";

export const LoginPasswordResetDialog = (params: {
    passwordResetDialogLogic: EpistoDialogLogicType
}) => {

    const { passwordResetDialogLogic } = params;

    const [email, setEmail] = useState("");

    const showError = useShowErrorDialog();

    // http
    const { requestPasswordChangeAsync, requestPasswordChangeState } = useRequestPasswordChange();

    const handleResetPw = async () => {

        try {

            await requestPasswordChangeAsync({ email });

            showNotification("Kerelmed fogadtuk, az emailt nemsokara meg fogod kapni a visszaalito linkel!");

            passwordResetDialogLogic.closeDialog();
        } catch (e) {

            showError(e);
        }
    }

    return (
        <EpistoDialog logic={passwordResetDialogLogic}>
            <Flex
                id="dialogFlex"
                width="500px"
                direction="column"
                align="center">

                {/* head */}
                <Flex
                    bg="var(--deepBlue)"
                    p="20px"
                    alignSelf="stretch"
                    overflow="hidden"
                    position="relative">

                    <EpistoHeader
                        className="fontLight"
                        text="Biztosan visszaalitod a jelszavad?" />

                    <Box
                        bg="var(--epistoTeal)"
                        position="absolute"
                        width="100%"
                        height="100%"
                        left="0"
                        top="85%"
                        transform="rotate(-2deg)" />
                </Flex>

                {/* desc */}
                <Typography
                    style={{
                        padding: "15px 15px 0px 15px"
                    }}>
                    A visszaallitashoz fogsz kapni egy linket, amivel egy uj jelszot tudsz majd beirni magadnak az EpistoGram feluleten.
                </Typography>

                {/* desc */}
                <Typography
                    className="fontSmall fontGrey"
                    style={{
                        padding: "15px"
                    }}>
                    Az emailben kapott visszaalitasi linket egyszer tudod felhasznalni, amit celszeru is minel elobb megtenni, mert uj link csak 3 naponta kuldheto, es egy link 8 oran belul lejar.
                </Typography>

                {/* email */}
                <EpistoLabel
                    width="90%"
                    text="Add meg az email cimed, amivel regisztraltal: ">

                    <FlexFloat
                        align="center"
                        p="5px"
                        borderRadius="15px">

                        <AlternateEmailIcon
                            style={{
                                color: "var(--epistoTeal)",
                                margin: "10px"
                            }} />

                        <Input
                            flex="1"
                            name="email"
                            value={email}
                            outline="none"
                            onChange={getEventValueCallback(setEmail)} />
                    </FlexFloat>
                </EpistoLabel>

                {/* affirmation */}
                <Typography
                    className="fontGrey fontSmall"
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                    }}>
                    Ezutan mar csak annyit kell tenned, hogy a 'Mehet!' gombra kattintasz, es mi kuldjuk is az emailt neked!
                </Typography>

                {/* buttons */}
                <EpistoButton
                    style={{ margin: "10px" }}
                    onClick={handleResetPw}
                    variant="colored">

                    Mehet
                </EpistoButton>
            </Flex>
        </EpistoDialog>
    );
}