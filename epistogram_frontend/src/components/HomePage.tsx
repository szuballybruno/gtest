import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { mockTasks } from '../mockData';
import { useOverviewPageDTO } from "../services/dataService";
import { translatableTexts } from '../translatableTexts';
import { DashoardLeftItemGroup } from "./dashboard/dashboard_components/DashBoardSpacers";
import { EpistoDialog, useEpistoDialogLogic } from './EpistoDialog';
import { CurrentUserContext } from "./HOC/AuthenticationFrame";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import Navbar from "./navbar/Navbar";
import { PractiseQuestions } from './PractiseQuestions';
import { Tasks } from './Tasks';
import { TipOfTheDay } from './TipOfTheDay';
import { CourseItemList, CourseItemView } from "./universal/CourseItemList";
import { CourseProgressBar } from './universal/CourseProgressBar';
import { DashboardSection } from './universal/DashboardSection';
import ListItem from './universal/listItem/ListItem';

const HomePage = () => {

    const user = useContext(CurrentUserContext);
    const { pageDTO, status, error } = useOverviewPageDTO();

    const currentItem = pageDTO?.currentCourseItems
        .filter(x => x.state === "current")[0];

    const currentItemThumbnailUrl = currentItem?.thumbnailUrl;
    const hasCurrentItem = !!currentItem;
    const hasCurrentCourse = hasCurrentItem;
    const courseItems = pageDTO?.currentCourseItems;
    const recommendedCourses = pageDTO?.recommendedCourses;

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LoadingFrame loadingState={status} error={error} onlyRenderIfLoaded={true}>
                <LeftPanel align="stretch" justify="stretch">

                    {/* courses progress */}
                    <DashoardLeftItemGroup title={translatableTexts.homePage.courseProgress}>
                        <Flex direction="column" p="10px">
                            <CourseProgressBar value={12} label={translatableTexts.homePage.excelCourseTitle} mb="5px" />
                            <CourseProgressBar value={45} label={translatableTexts.homePage.javaCourseTitle} mb="5px" />
                        </Flex>
                    </DashoardLeftItemGroup>

                    {/* active item */}
                    <DashoardLeftItemGroup
                        title={hasCurrentItem
                            ? translatableTexts.homePage.activeCourseContinue
                            : translatableTexts.homePage.activeCourseEmpty}>

                        {hasCurrentItem
                            ? <Box padding="10px">
                                <CourseItemView courseItem={currentItem!} />
                            </Box>

                            : <ListItem
                                mainTitle={translatableTexts.homePage.availableCoursesLinkTitle}
                                subTitle={translatableTexts.homePage.availableCoursesText}
                                thumbnailUrl={currentItemThumbnailUrl}
                                to={applicationRoutes.availableCoursesRoute.route} />}
                    </DashoardLeftItemGroup>

                    {/* current course */}
                    {hasCurrentCourse &&
                        <DashoardLeftItemGroup
                            title={translatableTexts.homePage.currentCourseTitle}
                            flex="1"
                            overflow="hidden">

                            <CourseItemList courseItems={courseItems!} />
                        </DashoardLeftItemGroup>}

                </LeftPanel>
                <RightPanel
                    padding="5px"
                    bg="var(--whiteGrey)">

                    <Flex direction="column">

                        <Flex wrap="wrap">

                            {/* test your knowledge */}
                            <DashboardSection
                                title={translatableTexts.homePage.practiseTitle}
                                minHeight="300px"
                                minWidth="500px"
                                flex="2">

                                <PractiseQuestions />
                            </DashboardSection>

                            {/* tip of the day */}
                            <DashboardSection
                                title={translatableTexts.homePage.tipOfTheDay}
                                minHeight="300px"
                                minWidth="300px"
                                flex="1">

                                <TipOfTheDay />
                            </DashboardSection>

                        </Flex>

                        {/* current tasks */}
                        <DashboardSection title={translatableTexts.homePage.tasks}>
                            <Tasks currentTasks={mockTasks} className="whall" />
                        </DashboardSection>

                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
