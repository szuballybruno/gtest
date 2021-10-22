import { Flex } from "@chakra-ui/react";
import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { AdminSubpageHeader } from '../AdminSubpageHeader';

const CourseStatisticsSubpage = () => {

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
                ]} />

            Course Stats
        </Flex>
    );
};

export default CourseStatisticsSubpage;