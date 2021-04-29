import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { getProfile } from '../../store/user'
import Profile from '../Profile';
import Bookings from '../Bookings';
import Sell from '../Sell';

import './ProfilePage.css';


const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log('user from session state', user)
    const userId = user.id;
    const [viewProfile, setViewProfile] = useState(true);
    const [viewBookings, setViewBookings] = useState(false);
    const [viewSell, setViewSell] = useState(false);



    useEffect(() => {
        if(user) {
            dispatch(getProfile(userId))
        }

    },[dispatch] )

    let sessionContent;
    if(viewProfile) {
        sessionContent = ( <Profile />)
    } else if (viewBookings) {
         sessionContent = ( <Bookings /> )
    } else if (viewSell) {
        sessionContent = ( <Sell /> )
    }

    return (
        <>
            <header>
                <div>
                    <p>Rent. Sell. Buy.</p>
                </div>
            </header>
            <div className='sidebar'>
                <ul>
                    <li><button type='button' onClick={() => [setViewProfile(true), setViewBookings(false), setViewSell(false)]}>Profile/Fit</button></li>
                    <li><button type='button' onClick={() => [setViewProfile(false), setViewBookings(true), setViewSell(false)]}>Bookings</button></li>
                    <li><button type='button' onClick={() => [setViewProfile(false), setViewBookings(false), setViewSell(true)]}>Sell</button></li>
                </ul>
            </div>
            <main>
                {sessionContent}
            </main>

        </>
    )
}





export default ProfilePage;
