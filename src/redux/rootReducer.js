import {SET_IS_FETCHING, SET_TOKEN, SET_USERS} from "./actions";

const initialState = {
    users: [],
    isFetching: false,
    token : null
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.payload};
        case SET_IS_FETCHING:
            return {...state, isFetching: action.payload};
        case SET_TOKEN:
            return {...state, token: action.payload};
        default:
            return state;
    }
};