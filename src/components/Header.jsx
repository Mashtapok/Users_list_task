import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import {logoutThunk} from "../redux/thunks";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            fontSize: "18px"
        },
    },
}));

export const Header = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const logoutHandler = () => {
        dispatch(logoutThunk());
    };
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title}
                            component="h1" variant="h5" align="center">
                    Список пользователей
                </Typography>
                <Button color="inherit" onClick={logoutHandler}>Выйти</Button>
            </Toolbar>
        </AppBar>
    );
};