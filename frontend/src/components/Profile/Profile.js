import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {updateProfile} from '../../store/user';
import { getProfile } from '../../store/user'

const Profile = () => {
    const user = useSelector(state => state.user.userProfile);


    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [dressSize, setDressSize] = useState('');


    useEffect(() => {
        console.log('user from profile state inside use effect', user)

        // if (user) {

        //     dispatch(getProfile(user))
        // }

    }, [user])


    const handleProfileSave = async (e) => {
        e.preventDefault();

        let payload = { id: user.id, firstName };
        console.log('payload from front end', payload)

        // if(firstName !== '' && lastName === '') {
        //     payload = { id: sessionUser.id, firstName };
        // } else if (firstName === '' && lastName !== '') {
        //     payload = { id: sessionUser.id, lastName };
        // } else if (firstName && lastName) {
        //     payload = { id: sessionUser.id, firstName, lastName };
        // }

        let updatedProfile = await dispatch(updateProfile(payload));
    }

    return (
        <div className='profile-container'>
            <div className='profile-info'>
                <h2>Profile</h2>
                <form onSubmit={handleProfileSave}>
                    <div className='profile-email'><label>Email</label>{user?.email}</div>
                    {user?.firstName? <li className='profile-firstName'><label>First Name</label>{user.firstName}</li> :
                    <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    }
                    {user?.lastName? <li className='profile-lastName'><label>Last Name</label>{user.lastName}</li> :
                    <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    }
                    <button type="submit">Save</button>
                </form>
            </div>
            {/* <div className='fit-info'>
                <h2>Fit</h2>
                {user.weight_lbs? <li className='fit-weight'><label>Weight</label>{}</li>}
            </div> */}
        </div>

    )
}

export default Profile;
