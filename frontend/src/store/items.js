import { csrfFetch } from './csrf';

const LOAD_ITEMS = "items/LOAD_ITEMS";
const LOAD_ONE_ITEM = "items/LOAD_ONE_ITEM";
const SET_ITEM = 'items/SET_ITEM';
const REMOVE_ITEM = 'items/REMOVE_ITEM';

const load = (items) => ({
    type: LOAD_ITEMS,
    items
})

const loadOneItem= (item) => ({
    type: LOAD_ONE_ITEM,
    item
})

const setItem = (item) => ({
    type: SET_ITEM,
    item
})

const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    itemId
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

//create an item
export const listItem = (listingItem) => async dispatch => {
    const {userId, photo, description, originalPrice_USD, priceToRent_USD, priceToBuy_USD, sizeSInventory, sizeMInventory, sizeLInventory, designerId, category} = listingItem;
    const formData = new FormData();


    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("originalPrice_USD", originalPrice_USD);
    formData.append("priceToRent_USD", priceToRent_USD);
    formData.append("priceToBuy_USD", priceToBuy_USD);
    formData.append("sizeSInventory", sizeSInventory);
    formData.append("sizeMInventory", sizeMInventory);
    formData.append("sizeLInventory", sizeLInventory);
    formData.append("designerId", designerId);
    formData.append("category", category);

    if(photo) formData.append('photo', photo);

    const res = await csrfFetch(`/api/items/listings`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    })

    const data = await res.json();
    dispatch(setItem(data.listingItem))

}


//delete item
// export const deleteItem = (listingId) => async dispatch => {

//     console.log('item to delete id from ITEM thunk', listingId)

//     const res = await csrfFetch(`/api/items/${listingId}`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(listingId)
//     })

//     const itemId = await res.json();
//     dispatch(removeItem(itemId));
// }




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
            // newState = Object.assign({}, state);
            // newState.items = action.item;
            // return newState;
            return {...state, item: action.item}
        }
        case SET_ITEM: {
            newState = Object.assign({}, state);
            newState.items = action.item;
            return newState;
        }
        case REMOVE_ITEM: {
            const newState = { ...state };
            delete newState[action.itemId];
            return newState;
        }
        default:
            return state;
    }


}

export default itemsReducer;
