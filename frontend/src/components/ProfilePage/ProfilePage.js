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
            <div >
                <header>
                    <div className='profile-rent-sell-buy'>
                        <p>Rent.   Sell.   Buy.</p>
                    </div>
                    <div className='header-underline' />
                </header>
                <div className='sidebar'>
                    <ul>
                        <li><button type='button' onClick={() => [setViewProfile(true), setViewBookings(false), setViewSell(false)]}>Profile</button></li>
                        <li><button type='button' onClick={() => [setViewProfile(true), setViewBookings(false), setViewSell(false)]}>Fit</button></li>
                        <li><button type='button' onClick={() => [setViewProfile(false), setViewBookings(true), setViewSell(false)]}>Bookings</button></li>
                        <li><button type='button' onClick={() => [setViewProfile(false), setViewBookings(false), setViewSell(true)]}>Sell</button></li>
                    </ul>
                </div>
                <main className='main-profile-page'>
                    {sessionContent}
                </main>
            </div>
        </>
    )
}





export default ProfilePage;
