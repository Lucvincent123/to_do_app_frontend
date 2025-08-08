import { SET_ENTRY, SET_USER } from './actions.type';

const initState = {
    user: {
        available: false,
        id: '',
        username: '',
        email: '',
    },
    entry: '/',
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_ENTRY:
            return {
                ...state,
                entry: action.payload,
            };
        default:
            throw new Error('Invalid action');
        //
    }
}

export { initState };
