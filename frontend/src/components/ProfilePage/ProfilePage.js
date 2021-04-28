import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { userProfile } from '../../store/session';
import Profile from '../Profile';


import './ProfilePage.css';


const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [viewProfile, setViewProfile] = useState(true);
    const [viewBookings, setViewBookings] = useState(false);
    const [viewSell, setViewSell] = useState(false);

    let sessionContent;
    if(viewProfile) {
        sessionContent = ( <Profile user={user}/>)
     } //else if (viewBookings) {
    //     sessionContent = ( <Bookings user={user}/> )
    // } else if (viewSell) {
    //     sessionContent = ( <Sell user={user} /> )
    // }

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
                    {/* <li><button type='button' onClick={() => [setViewProfile(false), setViewBookings(true), setViewSell(false)]}>Bookings</button></li>
                    <li><button type='button' onClick={() => [setViewProfile(false), setViewBookings(false), setViewSell(true)]}>Sell</button></li> */}
                </ul>
            </div>
            <main>
                {sessionContent}
            </main>

        </>
    )
}





export default ProfilePage;
