import React from 'react';
import classes from "./addFrame.module.scss"

export const AddFrame = (props: {
    children: any,
    submitHandler: (e: any) => any,
    title: string
}) => {

    return <div className={classes.addUserOuterWrapper}>
        <form className={classes.addUserInnerWrapper}
            onSubmit={props.submitHandler}>
            {props.children}
        </form>
    </div>
};