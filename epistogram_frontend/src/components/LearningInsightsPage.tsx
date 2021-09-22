import { Assignment, School, Subscriptions } from "@mui/icons-material";
import React from "react";
import { Route, Switch } from 'react-router-dom';
import { applicationRoutes } from "../configuration/applicationRoutes";
import { RouteItemType } from "../models/types";
import MyCourses from "./courseInsights/MyCourses";
import MyExams from "./examInsights/MyExams";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import { LearningInsightsOverview as LearningInsightsOverview } from "./learningInsightsOverview/LearningInsightsOverview";
import { NavigationLinkList } from "./NavigationLinkList";
import Navbar from "./universal/navigation/navbar/Navbar";

const LearningInsightsPage = () => {

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel padding="20px">
                <NavigationLinkList items={[
                    applicationRoutes.learningRoute.learningOverviewRoute,
                    applicationRoutes.learningRoute.myCoursesRoute,
                    applicationRoutes.learningRoute.myExamsRoute
                ]} />
            </LeftPanel>

            <RightPanel>
                <Switch>
                    <Route path={applicationRoutes.learningRoute.route} exact>
                        <LearningInsightsOverview />
                    </Route>
                    <Route path={applicationRoutes.learningRoute.myCoursesRoute.route}>
                        <MyCourses />
                    </Route>
                    <Route path={applicationRoutes.learningRoute.myExamsRoute.route}>
                        <MyExams />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper >
    </MainWrapper >
};
export default LearningInsightsPage
