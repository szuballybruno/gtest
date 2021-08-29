//BASIC
import { Flex } from "@chakra-ui/react";
import { Divider, Grid } from "@material-ui/core";
import React, { ReactNode } from 'react';
import { useContext } from "react";
import menuItems from "../../configuration/menuItems.json";
import { CurrentUserContext } from "../../HOC/data_manager_frame/DataManagerFrame";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/mainPanels/MainPanels";
import { useOverviewPageDTO } from "../../services/dataService";
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import ListItem from "../universal/atomic/listItem/ListItem";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import CourseItemList from "./dashboard_components/CurrentCourseStats/CurrentCourse";
import { DashBoardRightSpacer, DashboardVerticalDivider, DashoardLeftItemGroup } from "./dashboard_components/DashBoardSpacers";
import { OverviewDashboard } from "./dashboard_components/OverviewDashboard/OverviewDashboard";
import ProfileStats from "./dashboard_components/ProfileStats/ProfileStats";
import RecommendedCourses from "./dashboard_components/RecommendedCourses/RecommendedCourses";
import Votes from "./dashboard_components/Votes/Votes";
import classes from './userDashBoard.module.scss';

const OverviewSection = (props: { children: ReactNode, title: string }) => {

    return <>
        <AdminDashboardHeader titleText={props.title} />
        <Divider className={classes.divider} />
        {props.children}
    </>
}

const OverviewPage = () => {

    const user = useContext(CurrentUserContext);
    const { pageDTO, status, error } = useOverviewPageDTO();

    console.log(pageDTO);

    // current item
    const currentItem = pageDTO?.currentCourseItem;
    const currentItemId = currentItem?.id;
    const currentItemTitle = currentItem?.title;
    const currentItemSubtitle = currentItem?.subTitle;
    const currentItemThumbnailUrl = currentItem?.thumbnailUrl;
    const hasCurrentItem = !!currentItemId;

    // recommended courses
    const recommendedCourses = pageDTO?.recommendedCourses;

    // current course items
    const currentCourseId = pageDTO?.currentCourseId;
    const courseItems = pageDTO?.currentCourseItems;
    const hasCurrentCourse = !!currentCourseId;

    const watchCurrentCurrentUrl = "/watch/" + currentCourseId + "/" + currentItemId;

    return <MainWrapper>

        <Navbar showHighlightedButton={true}
            menuItems={menuItems["user"]}
            showLastButton={true}
            showNavigation={true} />

        <LoadingFrame loadingState={status} error={error}>
            <ContentWrapper>
                <LeftPanel>
                    <Grid>

                        {/* profile data */}
                        <ProfileStats user={user!} />

                        <DashboardVerticalDivider />

                        {/* active item */}
                        <DashoardLeftItemGroup title={hasCurrentItem ? "Folytatom" : "Új tanfolyam kiválasztása"}>
                            {hasCurrentItem
                                ? <ListItem mainTitle={currentItemTitle!}
                                    subTitle={currentItemSubtitle!}
                                    thumbnailUrl={currentItemThumbnailUrl!}
                                    to={watchCurrentCurrentUrl} />

                                : <ListItem mainTitle={"Tanfolyamkereső"}
                                    subTitle={"Válaszd ki a legszimpatikusabb tanfolyamot"}
                                    thumbnailUrl={currentItemThumbnailUrl}
                                    to={"/kurzusok"} />}
                        </DashoardLeftItemGroup>

                        {/* current course */}
                        {hasCurrentCourse &&
                            <DashoardLeftItemGroup title={"Jelenlegi kurzus"} >
                                <CourseItemList courseItems={courseItems} />
                            </DashoardLeftItemGroup>}
                    </Grid>

                </LeftPanel>
                <RightPanel>

                    <OverviewSection title="Személyes tanulási asszisztens">
                        <OverviewDashboard dto={pageDTO} />
                    </OverviewSection>

                    <OverviewSection title="Szavazás">
                        <Votes />
                        {recommendedCourses === [] ? <DashBoardRightSpacer title={"Kurzusajánló"} /> : null}
                        {recommendedCourses === [] ? <RecommendedCourses courses={recommendedCourses} /> : null}
                        <DashBoardRightSpacer title={""} />
                    </OverviewSection>

                </RightPanel>
            </ContentWrapper>
        </LoadingFrame>
    </MainWrapper>
};

export default OverviewPage;
