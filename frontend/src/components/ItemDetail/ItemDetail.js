import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ useParams} from 'react-router-dom'

import { getOneItem } from '../../store/items';

import './ItemDetail.css';


const ItemDetail = () => {
    const dispatch = useDispatch();
    const item = useSelector(state => state.items.item)
    let { id } = useParams();

    const [size, setSize] = useState('')
    const [startDate, setStartDate] = useState('')
    const [rented, setRented] = useState(false);
    const [bought, setBought] = useState(false);


    useEffect(() => {
        dispatch(getOneItem(id))
    }, [dispatch])


    //Buy
    const handleBuy = async(e) => {
        e.preventDefault();
    }

    //Rent
    const handleRent = async(e) => {
        e.preventDefault();
    }


    let rentPurchaseContent;
    if(!rented && !bought) {
        rentPurchaseContent =(
            <div className='item-rent-purchase-form'>
                <form>
                    <label>
                        Size
                        <select value={size} onChange={(e) => setSize(e.target.value)}>
                            <option className='sell-size-drop' value=''>Select</option>
                            <option className='sell-size-options' value='s'>Small</option>
                            <option className='sell-size-options' value='m'>Medium</option>
                            <option className='sell-size-options' value='l'>Large</option>
                        </select>
                    </label>
                    <label>
                        Start Date
                        <input className='rent-date'value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='mm/dd/yyyy'/>
                    </label>
                    <button className='rent-button' type='submit' onClick={handleRent}>Rent</button>
                    <button className='buy-button' type='submit' onClick={handleBuy}>Buy</button>
                </form>
            </div>
        )
    }
    if(rented) {
        rentPurchaseContent = (
            <>
                <p>You've Rented This Item</p>
            </>
        )
    }
    if(bought) {
        rentPurchaseContent = (
            <>
                <p>You've Purchased This Item</p>
            </>
        )
    }


    return (
        <>
            <div className='item-detail-container'>
                <div className='back-arrow'>

                </div>
                <div className='item-detail-photo'>
                    <img src={item.photo} alt='item pic' />
                </div>
                <div className='item-info-container'>
                    <h2 className='item-designer'>{item.Designer.name}</h2>
                    <p className='item-retail'>{`Retail Price: $${item.originalPrice_USD}`}</p>
                    <p className='item-description'>{item.description}</p>
                </div>
                <div>
                    {rentPurchaseContent}
                </div>

            </div>

        </>
    )
}



export default ItemDetail;
