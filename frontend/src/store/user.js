import { csrfFetch } from './csrf';


const GET_USER = 'session/GET_USER'

//action creators
const getUser = (user) => ({
    type: GET_USER,
    user
})


//THUNKS
// get user profile
export const getProfile = ( userId ) => async dispatch => {

    const res = await csrfFetch(`/api/users/${userId}`);

    if(!res.ok) throw res;
    const user = await res.json();

    console.log('user from userprofile thunk', user);
    dispatch(getUser(user))
}

//update profile
export const updateProfile = ( payload ) => async dispatch => {
    console.log('payload from session profile update thunk', payload)
    const res = await csrfFetch(`/api/users/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!res.ok) throw res;
    const data = await res.json();
    console.log('this user from session store', data.user)
    dispatch(getUser(data.user))
}





const initialState = { userProfile: null };

const userReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_USER: {
            newState = Object.assign({}, state);
            newState.userProfile = action.user;
            return newState;
        }
        default:
            return state;
    }
}

export default userReducer;
