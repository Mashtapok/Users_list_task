import {AuthAPI, UsersAPI} from "../api";
import {setIsFetching, setToken, setUsers} from "./actions";

export const requestUsers = () => async dispatch => {
    dispatch(setIsFetching(true));
    const data = await UsersAPI.getUsers();
    dispatch(setUsers(data));
    dispatch(setIsFetching(false));
    return data
};

export const loginThunk = (data) => async dispatch => {
    const token = await AuthAPI.login(data.username, data.password);
    dispatch(setToken(token.token));
    localStorage.setItem('token', token.token)
};

export const logoutThunk = () => async dispatch => {
    dispatch(setToken(null));
    localStorage.removeItem('token');
};