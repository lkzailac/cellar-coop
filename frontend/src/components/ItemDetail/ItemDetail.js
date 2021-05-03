import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ useParams} from 'react-router-dom'

import { getOneItem } from '../../store/items';
import { bookItem } from '../../store/user';

import './ItemDetail.css';


const ItemDetail = () => {
    const dispatch = useDispatch();
    const item = useSelector(state => state.items.item)
    const user = useSelector(state => state.session.user);
    const userId = user.id;
    let { id } = useParams();

    const [size, setSize] = useState('')
    const [startDate, setStartDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [rent, setRent] = useState(false);
    const [buy, setBuy] = useState(false);


    useEffect(() => {
        dispatch(getOneItem(id))
    }, [dispatch])


    //Buy
    const handleBuy = async(e) => {
        e.preventDefault();
        setBuy(true)

        const toReturn = (startDate) => {
            if(startDate) {
                let arr = startDate.split('/');

            let numArr = arr.map((d) => Number(d))
            if(numArr[0] < 12) {
                numArr[0] = numArr[0] + 1
            } else {
                numArr[0] = 1
                numArr[2] = numArr[2] + 1
            }
            let arrStr = numArr.map((d) => (
                d.toString()
            ))
            if(arrStr[0].length < 2) {
                arrStr[0] = 0 + arrStr[0]
            }
            if(arrStr[1].length < 2) {
                arrStr[1] = 0 + arrStr[1]
            }
            let newDate = arrStr.join('/')

            return newDate;
            }
        }
        let returnDate = toReturn(startDate);

        const booking = {
            size,
            startDate,
            returnDate,
            rent: false,
            buy: true,
            itemId: id,
            userId,
        }

        const newBooking = await dispatch(bookItem(booking))
    }

    //Rent
    const handleRent = async(e) => {
        e.preventDefault();

        setRent(true)
        //find return date 1 mo later
        const toReturn = (startDate) => {
            if(startDate) {
                let arr = startDate.split('/');

            let numArr = arr.map((d) => Number(d))
            if(numArr[0] < 12) {
                numArr[0] = numArr[0] + 1
            } else {
                numArr[0] = 1
                numArr[2] = numArr[2] + 1
            }
            let arrStr = numArr.map((d) => (
                d.toString()
            ))
            if(arrStr[0].length < 2) {
                arrStr[0] = 0 + arrStr[0]
            }
            if(arrStr[1].length < 2) {
                arrStr[1] = 0 + arrStr[1]
            }
            let newDate = arrStr.join('/')

            return newDate;
            }
        }
        let returnDate = toReturn(startDate);

        const booking = {
            size,
            startDate,
            returnDate,
            rent: true,
            buy: false,
            itemId: id,
            userId,
        }

        const newBooking = await dispatch(bookItem(booking))
    }


    let rentPurchaseContent;
    if(!rent && !buy) {
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
                    <div class='rent-buy-buttons'>
                        <button className='rent-button' type='submit' onClick={handleRent}>{`Rent for $${item?.priceToRent_USD}`}</button>
                        <button className='buy-button' type='submit' onClick={handleBuy}>{`Buy for $${item?.priceToBuy_USD}`}</button>
                    </div>

                </form>
            </div>
        )
    }
    if(rent) {
        rentPurchaseContent = (
            <>
                <p>You've Rented This Item</p>
            </>
        )
    }
    if(buy) {
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
                    <img src={item?.photo} alt='item pic' />
                </div>
                <div className='item-info-container'>
                    <div className='item-designer'>
                        <h2 >{item?.Designer.name}</h2>
                    </div>
                    <div className='item-retail'>
                        <p>{`Retail Price: $${item?.originalPrice_USD}`}</p>
                    </div>
                    <div className='item-description'>
                        <p >{item?.description}</p>
                    </div>
                </div>
                <div className='rent-purchase-content'>
                    {rentPurchaseContent}
                </div>

            </div>

        </>
    )
}



export default ItemDetail;
