import React from 'react';
import classes from './userTasks.module.scss'
import Tasks from "../../../../profile/profile_components/me/learning_components/Tasks";
import { user } from '../../../../../store/types/user';
import {Add} from "@material-ui/icons";
import {Fab} from "@material-ui/core";

const UserTasks = (props: {user: user, index: number}) => {
    return (
        <div className={classes.userTasksWrapper}>
            <Tasks tasksArray={props.user.tasks} />
            <Fab color="primary"
                 aria-label="add"
                 style={{position: "absolute", bottom: 45, right: 45}}>
                <Add />
            </Fab>
        </div>
    );
};

export default UserTasks;
