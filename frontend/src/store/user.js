import { csrfFetch } from './csrf';
// import {SET_ITEM } from './items';

const GET_USER = 'session/GET_USER'
const SEE_BOOKING = 'session/SEE_BOOKING'
const SEE_LISTING = 'session/SEE_LISTING'
const SEE_DESIGNERS = 'session/SEE_DESIGNERS'
const REMOVE_LISTING = 'session/REMOVE_ITEM'



//action creators
const getUser = (user) => ({
    type: GET_USER,
    user
})

const seeBookings = (bookings) => ({
    type: SEE_BOOKING,
    bookings
})

const seeListings = (listings) => ({
    type: SEE_LISTING,
    listings
})

const seeDesigners = (designers) => ({
    type: SEE_DESIGNERS,
    designers
})

const removeListing = (listingId) => ({
    type: REMOVE_LISTING,
    listingId
})




//THUNKS
// get user profile
export const getProfile = ( userId ) => async dispatch => {

    const res = await csrfFetch(`/api/users/${userId}`);

    if(!res.ok) throw res;
    const user = await res.json();

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

//get bookings
export const getBookings = (userId) => async dispatch => {

    const res= await csrfFetch(`/api/users/${userId}/bookings`);

    if(!res.ok) throw res;
    const bookings = await res.json();

    dispatch(seeBookings(bookings))
}

//get listings
export const getListings = (userId) => async dispatch => {

    const res= await csrfFetch(`/api/users/${userId}/listings`);

    if(!res.ok) throw res;
    const listings = await res.json();

    dispatch(seeListings(listings))
}



//delete listing
export const deleteListing = (listingId) => async dispatch => {

    console.log('listing to delete id from USER thunk', listingId)

    const res = await csrfFetch(`/api/users/listings/${listingId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({listingId})
    })

    const listId = await res.json();
    dispatch(removeListing(listingId));
}



//get designers for sell dropdown
export const getDesigners = (userId) => async dispatch => {

    const res= await csrfFetch(`/api/users/${userId}/designers`);

    if(!res.ok) throw res;
    const designers = await res.json();
    dispatch(seeDesigners(designers))
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
        case SEE_BOOKING: {
            newState = Object.assign({}, state);
            newState.bookings = action.bookings;
            return newState;
        }
        case SEE_LISTING: {
            newState = Object.assign({}, state);
            newState.listings = action.listings;
            return newState;
        }
        case SEE_DESIGNERS: {
            newState = Object.assign({}, state);
            newState.designers = action.designers;
            return newState;
        }
        case REMOVE_LISTING: {
            const newState = { ...state };
            newState.listings = newState.listings.filter((listing) => listing.id !== Number(action.listingId))
            return newState;
        }
        // case SET_ITEM: {
        //     newState = Object.assign({}, state);
        //     newState.listings = action.item;
        //     return newState;
        // }
        default:
            return state;
    }
}

export default userReducer;
