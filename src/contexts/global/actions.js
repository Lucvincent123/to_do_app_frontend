import { SET_USER, SET_ENTRY } from './actions.type';

export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload,
    };
};

export const setEntry = (payload) => {
    return {
        type: SET_ENTRY,
        payload,
    };
};
