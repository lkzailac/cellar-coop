import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';


function ProfileDropDown({ user }) {
    const dispatch = useDispatch();
    const [viewMenu, setViewMenu] = useState(true)

    useEffect(() => {

        const closeMenu = () => {
            setViewMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [viewMenu])

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>

            {viewMenu && (
                <ul className='profile-dropdown'>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
}


export default ProfileDropDown;
