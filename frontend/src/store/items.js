import { csrfFetch } from './csrf';

const LOAD_ITEMS = "items/LOAD_ITEMS";
const LOAD_ONE_ITEM = "items/LOAD_ONE_ITEM";

const load = (items) => ({
    type: LOAD_ITEMS,
    items
})

const loadOneItem= (item) => ({
    type: LOAD_ONE_ITEM,
    item
})

export const getItems = () => async dispatch => {
    const res = await csrfFetch('/api/items');

    if (!res.ok) throw res;
    const items = await res.json();
    dispatch(load(items));
}

// go to one item's detail page
export const getOneItem = (itemId) => async dispatch => {
    const res = await csrfFetch(`/api/items/${itemId}`);

    if (!res.ok) throw res;
    const item = await res.json();
    dispatch(loadOneItem(item));
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
        case LOAD_ONE_ITEM: {
            newState = Object.assign({}, state);
            newState.item = action.item;
            return newState;
        }
        default:
            return state;
    }


}

export default itemsReducer;
