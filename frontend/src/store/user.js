import { csrfFetch } from './csrf';
import {SET_ITEM } from './items';

const GET_USER = 'session/GET_USER'
const SEE_BOOKING = 'session/SEE_BOOKING'
const SEE_LISTING = 'session/SEE_LISTING'
const SEE_DESIGNERS = 'session/SEE_DESIGNERS'
const REMOVE_LISTING = 'session/REMOVE_ITEM'
const SET_BOOKING = 'session/SET_BOOKING'


//action creators
const getUser = (user) => ({
    type: GET_USER,
    user
})

const seeBookings = (bookings) => ({
    type: SEE_BOOKING,
    bookings
})

const getBooking = (booking) => ({
    type: SET_BOOKING,
    booking
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

    const res = await csrfFetch(`/api/users/${payload.id}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!res.ok) throw res;
    const user = await res.json();
    dispatch(getUser(user))
}

//get bookings
export const getBookings = (userId) => async dispatch => {

    const res= await csrfFetch(`/api/users/${userId}/bookings`);

    if(!res.ok) throw res;
    const bookings = await res.json();

    dispatch(seeBookings(bookings))
}

//new booking
export const bookItem = (booking) => async dispatch => {
    // console.log('booking from THUNk', booking)

    const res = await csrfFetch(`/api/users/${booking.userId}/bookings`, {
        method: "POST",
        body: JSON.stringify({booking}),
        headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) throw res;
    const newBooking = await res.json();
    // console.log('new booking from THUNK', newBooking)
    dispatch(getBooking(newBooking))
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
            newState = { ...state };
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
        case SET_ITEM: {
            newState = Object.assign({}, state);
            newState.items = action.item;
            return newState;
        }
        case SET_BOOKING: {
            // newState = Object.assign({}, state);
            // newState.bookings = action.booking;
            const newBooking = action.booking;
            newState = { ...state, newBooking }
            return newState;
        }
        default:
            return state;
    }
}

export default userReducer;
