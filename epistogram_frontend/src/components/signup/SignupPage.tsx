import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useNavigation } from "../../services/core/navigatior";
import { startUserGuide } from "../../services/core/userGuidingService";
import { getAssetUrl, usePaging } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoFont } from "../controls/EpistoFont";
import { SignupQuestions } from "../SignupQuestions";
import { CurrentUserContext, RefetchUserAsyncContext } from "../system/AuthenticationFrame";
import { PageRootContainer } from "../PageRootContainer";
import { EpistoPaging } from "../universal/EpistoPaging";
import { SignupWrapper } from "./SignupWrapper";
import { ContentPane } from "../ContentPane";

export const SignupPage = () => {

    // slides
    const slidesState = usePaging([1, 2, 3]);
    const user = useContext(CurrentUserContext)!;
    const refetchUserAsync = useContext(RefetchUserAsyncContext)!;
    const isInvitedUser = user.isTrusted;

    const { navigate } = useNavigation();

    const handleGoToSummary = () => {

        slidesState.next();
        refetchUserAsync();
    };

    const handleGoToHomePage = () => {

        navigate(applicationRoutes.homeRoute.route);

        console.log("Showing guide...");
        startUserGuide();
    };

    const GreetSlide = () => <SignupWrapper
        title={translatableTexts.signupPage.greetSlideTitle}
        currentImage={getAssetUrl("/signupQuestionImages/regisztracio.svg")}
        description={translatableTexts.signupPage.greetSlideDescription}
        onNext={() => slidesState.next()}
        nextButtonTitle={translatableTexts.signupPage.greetSlideNextButton}>
    </SignupWrapper>;

    const QuestionnaireSlide = () => <SignupQuestions
        onNextOverNavigation={handleGoToSummary}
        onPrevoiusOverNavigation={slidesState.previous}
        onJumpToResults={slidesState.jumpToLast} />;

    const SummarySlide = (isCurrent: boolean) => <SignupWrapper
        currentImage={getAssetUrl("/images/analysis3D.png")}
        description={<EpistoFont isMultiline>

            {/* this part should be bolder */}
            <EpistoFont
                style={{ fontWeight: 500 }}>

                {translatableTexts.signupPage.summarySlideDescriptionParts[0]}
            </EpistoFont>

            {translatableTexts.signupPage.summarySlideDescriptionParts[1]}

            {/* this part should be bolder */}
            <EpistoFont
                style={{ fontWeight: 500 }}>

                {translatableTexts.signupPage.summarySlideDescriptionParts[2]}
            </EpistoFont>
        </EpistoFont>}
        onNext={isInvitedUser ? handleGoToHomePage : undefined}
        nextButtonTitle={isInvitedUser ? translatableTexts.signupPage.goToHomePage : undefined}
        onNavPrevious={() => slidesState.previous()}
        headerRightButton={isInvitedUser ? { name: translatableTexts.signupPage.goToHomePage, action: handleGoToHomePage } : undefined}>
    </SignupWrapper >;

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ];

    return (
        <PageRootContainer noBackground
noMaxWidth>

            <ContentPane
                align="center"
                justify="center"
                background="radial-gradient(farthest-corner at 300px 100px, rgba(177,208,242,0.7) 33%, rgba(255,255,255,1) 100%)"
                hideNavbar
                noMaxWidth
                padding={20}>

                <EpistoPaging
                    className="roundBorders largeSoftShadow"
                    alwaysRender={true}
                    width="calc(100% - 150px)"
                    maxW="1400px"
                    height="calc(100vh - 100px)"
                    background="var(--transparentWhite70)"
                    maxH="800px"
                    p="10px"
                    zIndex="1"
                    flex="1"
                    slides={slides}
                    index={slidesState.currentIndex} />

            </ContentPane>
        </PageRootContainer>
    );
};
