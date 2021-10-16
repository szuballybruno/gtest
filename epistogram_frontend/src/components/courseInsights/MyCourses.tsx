import { Flex, Grid } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from 'react';
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { useUserCourseData } from "../../services/courseService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import CourseTile from "../universal/CourseTile";
import { DashboardSection } from "../universal/DashboardSection";
import { EpistoGrid } from "../universal/EpistoGrid";
import { FlexFloat } from "../universal/FlexFloat";
import { InfoGrid } from "../universal/InfoGrid";

const CourseStatCard = (props: { course: CourseShortDTO }) => {

    const { title, thumbnailImageURL } = props.course;

    const stats = [
        {
            text: "Fókusz 24%"
        },
        {
            text: "Pontosság 24%"
        },
        {
            text: "Elvégzett vizsgák: 45"
        },
        {
            text: "A kurzus teljes időtartalma: 3h"
        },
        {
            text: "Reakció idő: 12s"
        },
    ]

    return <CourseTile course={props.course} borderRadius="0">
        <InfoGrid infos={stats.map(x => x.text)} />
    </CourseTile>
}

const MyCourses = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = useUserCourseData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const isAnyCoursesInProgress = coursesData?.isAnyCoursesInProgress;
    const completedCourses = coursesData?.completedCourses ?? [];
    const inProgressCourses = coursesData?.inProgressCourses ?? [];

    return <LoadingFrame
        loadingState={coursesDataStatus}
        error={coursesDataError}
        direction="column"
        overflowY={"scroll"}>

        {/* completed courses */}
        <DashboardSection variant="noShadow" title="Elvégzett kurzusaim" >
            {isAnyCoursesComplete
                ? <EpistoGrid
                    minColumnWidth="300px"
                    auto="fill"
                    gap="15px"
                    p="20px">

                    {completedCourses
                        .map((course, index) => <CourseStatCard key={index} course={course} />)}
                </EpistoGrid>

                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection >

        <DashboardSection variant="noShadow" title="Folyamatban lévő kurzusaim">
            {isAnyCoursesInProgress
                ? <EpistoGrid
                    minColumnWidth="300px"
                    auto="fill"
                    gap="15px"
                    p="20px">
                    {inProgressCourses
                        .map((course, index) => <CourseStatCard key={index} course={course} />)}
                </EpistoGrid>
                : <Flex p="100px">
                    <Typography variant={"h6"}>Még nem végeztél el egyetlen kurzust sem.</Typography>
                </Flex>}
        </DashboardSection>
    </LoadingFrame>
};

export default MyCourses;
