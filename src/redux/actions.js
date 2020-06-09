export const SET_USERS = "SET_USERS";
export const SET_IS_FETCHING = "SET_IS_FETCHING";
export const SET_TOKEN = "SET_TOKEN";

export const setUsers = users => ({
    type: SET_USERS,
    payload: users
});

export const setIsFetching = isFetching => ({
    type: SET_IS_FETCHING,
    payload: isFetching
});

export const setToken = token => ({
    type: SET_TOKEN,
    payload: token
});
