import { csrfFetch } from './csrf';

const LOAD_ITEMS = "items/LOAD_ITEMS";


const load = (items) => ({
    type: LOAD_ITEMS,
    items
})

export const getItems = () => async dispatch => {
    const res = await csrfFetch('/api/items');

    if (!res.ok) throw res;
    const items = await res.json();
    dispatch(load(items));
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
        default:
            return state;
    }


}

export default itemsReducer;
