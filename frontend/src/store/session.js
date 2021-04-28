import { csrfFetch } from './csrf';

const SET_SESSION_USER = '/session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';
const LOAD_USER = 'session/LOAD_USER';



//action creators
const setUser = (user) => ({
    type: SET_SESSION_USER,
    user
});

const removeUser = () => ({
    type: REMOVE_SESSION_USER
});

const loadUser = (user) => ({
    type: LOAD_USER,
    user
})

//thunk action creators
export const login = ({ email, password }) => async (dispatch) => {

    const res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({email, password})
    });

    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const loginDemo = (email, password) => async (dispatch) => {

    const res = await csrfFetch('/api/session/demo', {
        method: "POST",
        body: JSON.stringify({email, password})
    });

    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}


export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const signup = (user) => async dispatch => {
    const {username, email, password} = user;

    const res = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const userProfile = ({ myUser }) => async dispatch => {
    const res = await csrfFetch(`/api/users/${myUser.id}`);

    if(!res.ok) throw res;
    const data = await res.json();
    console.log('this user from session store', data.user)
    dispatch(loadUser(data.user))
}

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE"
    });
    dispatch(removeUser());
    return res;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET_SESSION_USER: {
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        }
        case REMOVE_SESSION_USER: {
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        case LOAD_USER: {
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        }
        default:
            return state;
    }
}

export default sessionReducer;
