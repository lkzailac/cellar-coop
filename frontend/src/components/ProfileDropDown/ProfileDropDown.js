import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './ProfileDropDown.css';

function ProfileDropDown({ user }) {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <ul className='profile-dropdown'>
                <li>{user.email}</li>
                {/* <li className='profile-dropdown-profile'><Link to={`/users/${sessionUser.id}`} >Profile</Link></li> */}
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    )
}


export default ProfileDropDown;
