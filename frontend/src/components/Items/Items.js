import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getItems } from '../../store/items';

// import '../../index.css';
import './Items.css';


const ItemsPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);
    console.log('items from front end', items);

    useEffect(() => {
        dispatch(getItems())
    },[dispatch])


    return (
        <>
            <div className='sorted'>
                <p>Sorted By: Most Recent</p>
            </div>
            <div className='itemList'>
                {items?.map((item) => (
                <div key={item.id} className='itemList-detail'>
                    <img src={`${item.photo}`} alt='category' />
                    <div className='itemList-detail-info'>
                        <p>Designer</p>
                        <p>sizes</p>
                        <p>{`rent for $${item.priceToRent_USD}`}</p>
                    </div>

                </div>
                ))}
            </div>

        </>


    )
}






export default ItemsPage;
