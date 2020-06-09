import React, {useEffect, useRef, useState} from "react";
import {requestUsers} from "../../redux/thunks";
import {useDispatch, useSelector} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import {User} from "../User";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Filter} from "../Filter";
import {setUsers} from "../../redux/actions";
import Skeleton from '@material-ui/lab/Skeleton';
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
}));

export const UsersList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isFetching, users} = useSelector(state => state);
    const [active, setActive] = useState("default");

    const increaseSortHandler = () => {
        const increaseSorted = users.slice().sort( (a, b) => {
            return a.id - b.id
        });
        dispatch(setUsers(increaseSorted))
        setActive('increase')
    };
    const decreaseSortHandler = () => {
        const decreaseSorted = users.slice().sort( (a, b) => {
            return b.id - a.id
        });
        dispatch(setUsers(decreaseSorted));
        setActive('decrease')
    };
    const defaultSortHandler = () => {
        dispatch(setUsers(initialRef.current));
        setActive('default')
    };

    let initialRef = useRef();
    useEffect(() => {
        dispatch(requestUsers()).then(fetchedUsers => {
            initialRef.current = fetchedUsers;
        })
    },[]);
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title}
                                component="h1" variant="h5" align="center">
                        Список пользователей
                    </Typography>
                    <Button color="inherit">Выйти</Button>
                </Toolbar>
            </AppBar>
        <Container maxWidth="md">
            <Filter increaseSortHandler={increaseSortHandler}
                    decreaseSortHandler={decreaseSortHandler}
                    defaultSortHandler={defaultSortHandler}
                    active={active}
            />
            <div>
                {isFetching ? <LinearProgress /> : null}
                {isFetching ? Array(6).fill(1).map(() => <Skeleton variant="rect" animation="wave"
                                                            width={"md"} height={118}
                                                            style={{marginBottom: "20px"}}/>) : null}
                {users.map(user => <User key={user.id}
                                         id={user.id}
                                         username={user.username}
                                         isActive={user.is_active}
                                         firstName={user.first_name}
                                         lastName={user.last_name}
                />)}
            </div>
        </Container>
            </>

    );
};