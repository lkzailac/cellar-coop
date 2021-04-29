import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ useParams} from 'react-router-dom'

import { getOneItem } from '../../store/items';

import './ItemDetail.css';

const ItemDetail = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items)
    let { id } = useParams();
    console.log('items from itemdetail comp', items)
    const item = items?.find((item) => item.id === id);
    console.log('the one item from itemdeatil', item);

    useEffect(() => {
        dispatch(getOneItem(id))
    }, [dispatch])

    return (
        <>
            <div className='item-detail-container'>
                <div className='item-detail-photo'>

                </div>
                <div className='item-info-container'>
                    <h2 className='item-designer'>Designer</h2>
                    <p className='item-retail'>{`Retail Price: `}</p>
                    <p className='item-description'>description.........</p>
                </div>
                <div className='item-rent-purchase-form'>
                    <form>
                        <select>
                            <option value= ''>Select</option>
                            <option value='s'>Small</option>
                        </select>
                    </form>
                </div>
            </div>

        </>
    )
}



export default ItemDetail;
