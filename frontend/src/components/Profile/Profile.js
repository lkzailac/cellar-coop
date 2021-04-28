import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userProfile } from '../../store/session';

import './Profile.css';


const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log('user in front end profile page', user);

    return (
        <p>hi user</p>
    )
}





export default Profile;
