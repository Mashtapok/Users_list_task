import {UsersAPI} from "../api";
import {setIsFetching, setUsers} from "./actions";

export const requestUsers = () => async dispatch => {
    dispatch(setIsFetching(true));
    const data = await UsersAPI.getUsers();
    dispatch(setUsers(data));
    dispatch(setIsFetching(false));
    return data
};