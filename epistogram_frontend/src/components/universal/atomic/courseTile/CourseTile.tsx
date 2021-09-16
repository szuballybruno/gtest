import { Box, Flex } from "@chakra-ui/react";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Gradient } from 'react-gradient';
import { NavLink } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { CourseShortDTO } from "../../../../models/shared_models/CourseShortDTO";
import { httpPostAsync, usePostData } from "../../../../services/httpClient";
import { useNavigation } from "../../../../services/navigatior";
import classes from "./courseTile.module.scss";
import DoneIcon from '@material-ui/icons/Done';

const CourseTile = (props: {
    course: CourseShortDTO,
    itemIndex: number,
    className?: string
}) => {

    const anim = useSpring({ opacity: 1, from: { opacity: 0 } })
    const course = props.course;
    const colorOne = course.colorOne;
    const colorTwo = course.colorTwo;
    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const { navigateToPlayer } = useNavigation();

    const playCourse = async () => {

        await httpPostAsync(`/course/start-course?courseId=${course.courseId}`);
        navigateToPlayer(course.firstItemCode);
    }

    return <Grid className={props.className} item xs={12} sm={12} md={6} lg={4} xl={3} >
        <Paper>
            <animated.div style={anim} className={classes.searchItem}>
                <div className={classes.videoItemTopWrapper}>

                    <Box position="relative">

                        <animated.img
                            className={classes.videoItemThumbnailImage}
                            style={anim}
                            src={thumbnailImageUrl} />

                        {/* done overlay */}
                        <Flex
                            position="absolute"
                            top={0}
                            left={0}
                            width="100%"
                            justify="flex-end">

                            <DoneIcon style={{
                                color: "var(--mildGreen)",
                                height: "50px",
                                width: "50px",
                                margin: "4px",
                                borderRadius: "50%",
                                border: "4px solid var(--mildGreen)",
                                background: "white"
                            }} />
                        </Flex>

                    </Box>
                    <div className={classes.videoTitleOuterWrapper}>

                        <Gradient className={classes.courseTitleBorder}
                            gradients={[[colorOne || "grey", colorTwo || "grey"]]}
                            property="background"
                            duration={3000}
                            angle="45deg" />

                        <div className={classes.videoInteractionsWrapper}>

                            <div className={classes.videoTitleItem}>
                                <h3>{courseTitle}</h3>
                                <span>{courseTeacherName}</span>
                            </div>

                            <div className={classes.videoInfoInnerWrapper}>

                                {/* details */}
                                <Button onClick={() => window.location.href = "https://epistogram.com/excel/"}>
                                    Adatlap
                                </Button>

                                {/* start course */}
                                <Button
                                    onClick={playCourse}
                                    className={classes.videoInfoStartButton}>
                                    Indítás
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </animated.div>
        </Paper>
    </Grid >
};

export default CourseTile;
