import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';


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
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    )
}


export default ProfileDropDown;
