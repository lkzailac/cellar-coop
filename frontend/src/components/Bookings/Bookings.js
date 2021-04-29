import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import { getBookings } from '../../store/user';

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
            <div className='booking'>
                {bookings?.map((booking) => (
                    <>
                        <img src={booking.Item.photo}/>
                        <p className='booking-designer'>{booking.Item.Designer.name}</p>
                        {booking.rent ? <p className='booking-rent-buy'>{`rented for $${booking.Item.priceToRent_USD}`}</p> :
                        <p className='booking-rent-buy'>{`purchased for $${booking.Item.priceToBuy_USD}`}</p>}
                        <p key={booking.id}>{`size ${booking.size}`}</p>
                        <label className='booking-arrive'>
                            Arrives By
                            <p className='booking-arrive-date'>{booking.startDate}</p>
                        </label>
                        <label className='booking-return'>
                            Return By
                            <p className='booking-return-date'>{booking.returnDate}</p>
                        </label>

                    </>
                ))}
            </div>

        </div>


    )
}

export default Bookings;
