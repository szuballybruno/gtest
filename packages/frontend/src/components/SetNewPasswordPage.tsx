import React from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { CompanyApiService } from '../services/api/CompanyApiService1';
import { useSetNewPassword } from '../services/api/passwordChangeApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../services/core/notifications';
import { useIsMobileView } from '../static/frontendHelpers';
import { useRouteQuery } from '../static/locationHelpers';
import { ContentPane } from './ContentPane';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoHeader } from './EpistoHeader';
import { PageRootContainer } from './PageRootContainer';
import { LoadingFrame } from './system/LoadingFrame';
import { PasswordEntry, usePasswordEntryState } from './universal/PasswordEntry';

export const SetNewPasswordPage = () => {

    const { setNewPassword, setNewPasswordState } = useSetNewPassword();

    const passwordEntryState = usePasswordEntryState();

    const token = useRouteQuery(applicationRoutes.setNewPasswordRoute)
        .getValue(x => x.token, 'string');

    const { companyDetails } = CompanyApiService.useCompanyDetailsByDomain(window.location.origin);

    const isMobile = useIsMobileView();

    const showErrorDialog = useShowErrorDialog();

    const { navigate2 } = useNavigation();

    const handleSetNewPassword = async () => {
        try {

            if (!passwordEntryState.validate())
                return;

            await setNewPassword(passwordEntryState.password, passwordEntryState.passwordCompare, token);

            showNotification('Új jelszó sikeresen beállítva!');
            navigate2(applicationRoutes.homeRoute);

        }
        catch (e) {

            showErrorDialog(e);
        }
    };

    return <PageRootContainer
        align="flex-start"
        justify="center"
        position="relative">

        <ContentPane
            hideNavbar
            navbarBg="white"
            flex='1'
            className="whall"
            justify='center'
            align='center'>

            <LoadingFrame
                className='roundBorders mildShadow'
                id="form"
                direction="column"
                align='center'
                justify="center"
                width={isMobile ? '100%' : undefined}
                height={isMobile ? '100%' : undefined}
                p={isMobile ? '10px' : '80px 100px'}
                maxH={'calc(100% - 100px)'}
                background="var(--transparentWhite70)"
                zIndex="7"
                loadingState={setNewPasswordState}>

                {/* company logo */}
                <img
                    src={companyDetails?.logoUrl!}
                    style={{
                        width: '250px',
                        maxHeight: '115px',
                        objectFit: 'contain',
                        marginLeft: '15px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                    }}
                    alt="" />

                <EpistoHeader text="Új jelszó megadása"
                    mt="30px"
                    alignSelf="center">

                </EpistoHeader>

                <PasswordEntry
                    display='EPISTO'
                    state={passwordEntryState} />

                <EpistoButton
                    variant="colored"
                    padding="10px"
                    type="submit"
                    style={{
                        marginTop: '20px',
                        width: '100%',
                        backgroundColor: companyDetails?.primaryColor!
                    }}
                    onClick={handleSetNewPassword}>

                    Elküldés
                </EpistoButton>
            </LoadingFrame>
        </ContentPane>
    </PageRootContainer >;
};