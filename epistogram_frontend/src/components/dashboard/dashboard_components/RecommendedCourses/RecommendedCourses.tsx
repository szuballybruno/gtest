import React from 'react';
import { CourseShortDTO } from '../../../../models/shared_models/CourseShortDTO';
import CourseTile from '../../../universal/atomic/courseTile/CourseTile';
import classes from "./recommendedCourses.module.scss";

const RecommendedCourses = (props: { courses: CourseShortDTO[] }) => {

    return (
        <div className={classes.recommendedCoursesWrapper}>
            {/* {props.courses.map((course, index) => {
                return <CourseTile item={course} itemIndex={index} />
            })} */}
        </div>
    );
};

export default RecommendedCourses;
