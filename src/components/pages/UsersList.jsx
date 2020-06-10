import React, {useEffect, useRef, useState} from "react";
import {requestUsers} from "../../redux/thunks";
import {useDispatch, useSelector} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import {User} from "../User";
import Container from "@material-ui/core/Container";
import {Filter} from "../Filter";
import {setUsers} from "../../redux/actions";
import Skeleton from '@material-ui/lab/Skeleton';
import {Header} from "../Header";
import {useHistory} from "react-router-dom";

export const UsersList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {isFetching, users, token} = useSelector(state => state);
    const [active, setActive] = useState("default");
    const [keyword, setKeyword] = useState(null);

    let initialRef = useRef();
    useEffect(() => {
        dispatch(requestUsers()).then(fetchedUsers => {
            initialRef.current = fetchedUsers;
        })
    }, []);

    const increaseSortHandler = () => {
        const increaseSorted = users.slice().sort((a, b) => {
            return a.id - b.id
        });
        dispatch(setUsers(increaseSorted));
        setActive('increase')
    };
    const decreaseSortHandler = () => {
        const decreaseSorted = users.slice().sort((a, b) => {
            return b.id - a.id
        });
        dispatch(setUsers(decreaseSorted));
        setActive('decrease')
    };
    const defaultSortHandler = () => {
        dispatch(setUsers(initialRef.current));
        setActive('default')
    };

    const keywordIsEmpty = keyword => keyword == null;
    const userIncludes = (user, keyword) => user.username.toLowerCase().includes(keyword);
    const filterUsersBy = keyword => user => Boolean(keywordIsEmpty(keyword) || userIncludes(user, keyword));
    const searchedUsers = users.filter(filterUsersBy(keyword));

    const keywordChange = (event) => {
        event.target.value ? setKeyword(event.target.value.toLowerCase()) : setKeyword(null);
    };

    if (!token) history.push('/login');
    return (
        <>
            <Header/>
            <Container maxWidth="md">
                <Filter increaseSortHandler={increaseSortHandler}
                        decreaseSortHandler={decreaseSortHandler}
                        defaultSortHandler={defaultSortHandler}
                        active={active}
                        keywordChange={keywordChange}
                />
                <div>
                    {isFetching ? <LinearProgress/> : null}
                    {isFetching ? Array(6).fill(1).map((skeleton, index) =>
                        <Skeleton key={index} variant="rect" animation="wave"
                                  width={"md"} height={118}
                                  style={{marginBottom: "20px"}}/>) : null}
                    {searchedUsers.map(user => <User key={user.id}
                                                     id={user.id}
                                                     username={user.username}
                                                     isActive={user.is_active}
                    />)}
                </div>
            </Container>
        </>

    );
};