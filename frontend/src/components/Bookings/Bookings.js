import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBookings } from '../../store/user';

import './Bookings.css';

const Bookings = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userProfile);
    const bookings = useSelector(state => state.user.bookings);
    const userId = user.id;


    useEffect(() => {
        if(user) {
            dispatch(getBookings(userId))
        }
    }, [dispatch])




    return(
        <div className='bookings-container'>
            <h2>Bookings</h2>
            <div >
                {bookings?.map((booking) => (
                    <div className='booking'>
                        <div className='booking-img'>
                            <img src={booking.Item.photo}/>
                        </div>
                        <div className='booking-designer'>
                            <p >{booking.Item.Designer.name}</p>
                        </div>
                        <div className='booking-rent-buy'>
                            {booking.rent ? <p >{`rented for $${booking.Item.priceToRent_USD}`}</p> :
                            <p className='booking-rent-buy'>{`purchased for $${booking.Item.priceToBuy_USD}`}</p>}
                        </div>
                        <div className='booking-size'>
                            <p key={booking.id}>{`size ${booking.size}`}</p>
                        </div>
                        <div className='booking-arrive-label'>
                            <p>Arrives By</p>
                        </div>
                        <div className='booking-arrive'>
                            <p >{booking.startDate}</p>
                        </div>
                        <div className='booking-return-label'>
                            <p>Return By</p>
                        </div>
                        <div className='booking-return'>
                            <p >{booking.returnDate}</p>
                        </div>
                    </ div>
                ))}
            </div>

        </div>


    )
}

export default Bookings;
