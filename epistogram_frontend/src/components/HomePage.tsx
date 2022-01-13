import { Box, Flex } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useOverviewPageDTO } from '../services/api/miscApiService';
import { useNavigation } from '../services/core/navigatior';
import { translatableTexts } from '../static/translatableTexts';
import { DailyTip } from './DailyTip';
import { EpistoHeader } from './EpistoHeader';
import { PractiseQuestions } from './PractiseQuestions';
import { StatsSummary } from "./StatsSummary";
import { LoadingFrame } from "./system/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./system/MainPanels";
import { CourseItemView } from './universal/CourseItemList';
import { CourseProgressDisplay } from './universal/CourseProgressDisplay';
import { DashboardSection } from './universal/DashboardSection';
import { EpistoButton } from './universal/EpistoButton';
import { FlexListItem } from './universal/FlexListItem';
import { FlexListTitleSubtitle } from './universal/FlexListTitleSubtitle';

const HomePage = () => {

    const { pageDTO, status, error } = useOverviewPageDTO();
    const { navigate } = useNavigation();

    console.log(pageDTO?.currentCourseProgress?.title)

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    return <MainWrapper>

        <ContentWrapper>

            <LoadingFrame loadingState={status} error={error}>

                <LeftPanel>

                    {/* current course items and progress */}
                    {pageDTO?.currentCourseProgress ? <Flex
                        className='roundBorders'
                        mx="10px"
                        direction="column">

                        <CourseProgressDisplay
                            value={pageDTO.currentCourseProgress.progressPercentage}
                            label={pageDTO.currentCourseProgress.title}
                            continueItemCode={pageDTO.currentCourseProgress.continueItemCode}
                            mb="5px" />

                        <Flex
                            direction="column"
                            mt="5px">

                            {(pageDTO.currentCourseProgress.nextItems ?? [])
                                .map(x => (
                                    <CourseItemView courseItem={x} />))}
                        </Flex>
                    </Flex> : <FlexListItem
                        mx="10"
                        isLocked={false}
                        onClick={() => navigate(applicationRoutes.availableCoursesRoute.route)}
                        midContent={<Flex>

                            <Flex
                                className="roundBorders"
                                boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                                p="3px"
                                m="7px 10px 7px 0px"
                                bgColor={"var(--epistoTeal)"} />

                            <FlexListTitleSubtitle
                                title={translatableTexts.homePage.availableCoursesLinkTitle}
                                subTitle={translatableTexts.homePage.availableCoursesText} />
                        </Flex>}
                        endContent={<Flex
                            align="center"
                            justify="center"
                            flexBasis="50px">
                        </Flex>}>
                    </FlexListItem>}
                </LeftPanel>

                <RightPanel>

                    <Flex
                        direction="column"
                        minW={isSmallerThan1400 ? "1060px" : undefined}>

                        <Flex wrap="wrap">

                            {/* test your knowledge */}
                            <DashboardSection
                                title={translatableTexts.homePage.practiseTitle}
                                background="var(--transparentIntenseBlue)"
                                className="largeSoftShadow roundBorders"
                                color="white"
                                showDivider
                                minHeight="200px"
                                m="0 5px 10px 0"
                                flex="3 3 550px">

                                <PractiseQuestions />
                            </DashboardSection>

                            {/* tip of the day */}
                            <DashboardSection
                                title={translatableTexts.homePage.tipOfTheDay}
                                background="var(--transparentWhite70)"
                                borderRadius="6px"
                                showDivider
                                className="largeSoftShadow"
                                minHeight="30px"
                                m="0 0 10px 5px"
                                flex="2 2 300px">

                                <DailyTip />
                            </DashboardSection>
                        </Flex>

                        {/* stats */}
                        <Flex pb="40px">
                            <StatsSummary />
                        </Flex>

                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
