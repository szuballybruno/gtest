import React from 'react';
import classes from "./dashBoardSpacers.module.scss";
import {Divider, Typography} from "@material-ui/core";

export const DashBoardLeftSpacer = (props: {title: string}) => {
    return (
        <div className={classes.dashBoardLeftSpacerWrapper}>
            <Typography variant={"overline"}>{props.title}</Typography>
        </div>
    );
}

export const DashBoardLeftBorder = () => {
    return (
        <div className={classes.dashBoardLeftBorderWrapper} >
            <Divider style={{zIndex: 999, marginTop: 20}} />
        </div>
    )
}

export const DashBoardRightSpacer = (props: {title: string}) => {
    return (
        <div className={classes.dashBoardRightSpacerWrapper}>
            <Typography variant={"h4"}>{props.title}</Typography>
            <div className={classes.dashBoardRightSpacerWrapperDivider}>
                <Divider />
            </div>
        </div>
    );
};
