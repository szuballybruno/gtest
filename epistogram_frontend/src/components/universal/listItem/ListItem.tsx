import React from 'react';
import classes from './listItem.module.scss'
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { EpistoFont } from '../../controls/EpistoFont';

const LinkSelector = (props: {
    to?: string,
    className?: string,
    onClick?: any
    children: JSX.Element | JSX.Element[]
}) => {
    return props.to ? <NavLink to={props.to} className={`${classes.playbackNavlink} ${props.className}`} onClick={props.onClick}>
        {props.children}
    </NavLink> : <div className={`${classes.playbackNavlink} ${props.className}`} onClick={props.onClick}>
        {props.children}
    </div>
}

const ThumbnailSelector = (props: { thumbnailUrl?: string }) => {
    return props.thumbnailUrl ? <div className={classes.playbackThumbnailWrapper}>
        <img className={classes.playbackThumbnail} alt="" src={props.thumbnailUrl} />
        <label className={classes.courseCounterLabel}>

        </label>
    </div> : <div className={classes.leftSideBorder} />
}

const ListItem = (props: {
    active?: boolean
    className?: string,
    thumbnailUrl?: string,
    mainTitle: string,
    subTitle: string,
    statusBarPercentage?: number,
    to?: string
    onClick?: any
}) => {

    return <LinkSelector
        to={props.to}
        onClick={props.onClick}
        className={`${classes.playbackContainer} ${props.className} ${props.active ? classes.playbackContainerActive : null}`}>

        <ThumbnailSelector
            thumbnailUrl={props.thumbnailUrl} />

        <div className={classes.videoDataWrapper}>

            <div className={classes.videoMainTitleWrapper}>

                <EpistoFont
                    fontSize="fontNormal14"
                    isUppercase
                    style={{
                        fontWeight: 500
                    }}>

                    {props.mainTitle}
                </EpistoFont>
            </div>

            <div className={classes.videoSubTitleWrapper}>

                <EpistoFont fontSize="fontExtraSmall">

                    {props.subTitle}
                </EpistoFont>
            </div>
            <div className={classes.statusBar} />
        </div>
    </LinkSelector>
};

export default ListItem;
