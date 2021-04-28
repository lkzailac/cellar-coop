import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './ProfileDropDown.css';

function ProfileDropDown({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')


    };

    return (
        <>
            <ul className='profile-dropdown'>
                <li>{user.email}</li>
                <li className='profile-dropdown-profile'>
                    <NavLink id='link' to={`/users/${sessionUser.id}`}>Profile</NavLink>
                </li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    )
}


export default ProfileDropDown;
