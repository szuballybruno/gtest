import { Box } from "@chakra-ui/react";
import { Slider } from "@material-ui/core";
import React, { ReactNode } from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseItemList } from "../universal/CourseItemList";
import classes from './videoList.module.scss';

export const CourseItemSelector = (props: { courseItems: CourseItemDTO[] }) => {

    return <Box className={classes.videoListWrapper} bg="white" minWidth="390px">
        <div className={classes.videoListInnerWrapper}>

            {/* learning type selector */}
            <div className={classes.learningTypeSelector}>
                <Slider className={classes.slider}
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    step={1}
                    marks={[
                        {
                            value: 0,
                            label: 'Alapértelmezett',
                        },
                        {
                            value: 1,
                            label: 'Áttekintés',
                        },
                        {
                            value: 2,
                            label: 'Ismétlés',
                        }
                    ]}
                    min={0}
                    max={2} />
            </div>

            <CourseItemList courseItems={props.courseItems}></CourseItemList>
        </div>
    </Box>
}