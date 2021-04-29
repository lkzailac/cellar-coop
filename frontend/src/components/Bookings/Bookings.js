import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



import { getBookings } from '../../store/items';

const Bookings = ({user}) => {

    useEffect((user) => {
        // dispatch(getBookings(user))
    }, [user])


    return(
        <h2>Bookings</h2>
    )
}

export default Bookings;
