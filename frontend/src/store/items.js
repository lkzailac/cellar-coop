import { csrfFetch } from './csrf';

const LOAD_ITEMS = "items/LOAD_ITEMS";
const LOAD_BOOKINGS = "items/LOAD_BOOKINGS";

const load = (items) => ({
    type: LOAD_ITEMS,
    items
})

const loadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
})

export const getItems = () => async dispatch => {
    const res = await csrfFetch('/api/items');

    if (!res.ok) throw res;
    const items = await res.json();
    dispatch(load(items));
}

//user bookings thunk
export const getBookings = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/bookings`);

    if (!res.ok) throw res;
    const bookings = await res.json();
    dispatch(loadBookings(bookings));
}

const initialState = { items: null }

const itemsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_ITEMS: {
            newState = Object.assign({}, state);
            newState.items = action.items;
            return newState;
        }
        case LOAD_BOOKINGS: {
            newState = Object.assign({}, state);
            newState.bookings = action.bookings;
            return newState;
        }
        default:
            return state;
    }


}

export default itemsReducer;
