import React, {useEffect} from 'react';
import classes from './notes.module.scss'
import ListItem from "../../../../universal/atomic/listItem/ListItem";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {Button, Fab, Typography} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {useState} from "@hookstate/core";
import userSideState from "../../../../../store/user/userSideState";
import applicationRunningState from "../../../../../store/application/applicationRunningState";

const Notes = () => {
    const user = useState(userSideState)
    const app = useState(applicationRunningState)

    useEffect(() => {
        if (user.userData.notes.get()) {
            app.currentNote.set(JSON.parse(JSON.stringify(user.userData.notes[0].get())))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.notesContainer}>
            <div className={classes.notesInnerContainer}>
                <div className={classes.notesListContainer}>
                    {user.userData.notes.get() ? user.userData.notes.get().map((note, index) => {
                        return <ListItem mainTitle={note.title} subTitle={note.data} className={classes.notesListItem} onClick={() => {
                            app.currentNote.set(JSON.parse(JSON.stringify(note)))
                        }} />
                    }) : <div><Typography>Jelenleg nincs egy jegyzeted sem</Typography></div>}
                </div>
                <div className={classes.notesViewContainer}>
                    <div className={classes.headerTitle}>
                        <Typography variant={"h4"}>{app.currentNote.title.get() || "Nincs kiválasztva jegyzet"}</Typography>
                    </div>
                    <div className={classes.descriptionWrapper}>
                        <Typography>{app.currentNote.data.get() || "Válassz ki egy jegyzetet, vagy adj hozzá újat"}</Typography>
                        <Fab color="primary"
                             aria-label="add"
                             style={{position: "absolute", bottom: 0, right: 0}}>
                            <EditTwoToneIcon />
                        </Fab>
                        <Fab color="primary"
                             aria-label="add"
                             style={{position: "absolute", bottom: 0, right: 70}}>
                            <Add />
                        </Fab>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
