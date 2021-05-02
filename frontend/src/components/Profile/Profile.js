import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {updateProfile} from '../../store/user';

import './Profile.css';

const Profile = () => {
    const user = useSelector(state => state.user.userProfile);

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [height_in, setHeight] = useState(null);
    const [weight_lbs, setWeight] = useState(null);
    const [dressSize, setDressSize] = useState('');
    const [updatedProfile, setUpdatedProfile] = useState('')


    const handleProfileSave = async (e) => {
        e.preventDefault();

        let payload = {id: user.id};
        if(!user.firstName) {
            payload.firstName = firstName;
        }
        if(!user.lastName) {
            payload.lastName = lastName;
        }
        if(!user.height_in) {
            payload.height_in = height_in;
        }
        if(!user.weight_lbs) {
            payload.weight_lbs = weight_lbs;
        }
        if(!user.dressSize) {
            payload.dressSize = dressSize;
        }


        let updatedProfile = await dispatch(updateProfile(payload));
        setUpdatedProfile(updatedProfile);
    }

    useEffect(() => {
        // setUpdatedProfile(true)
    }, [firstName, lastName, height_in, weight_lbs, dressSize])

    return (
        <div className='profile-container'>
            <div className='profile-info'>
                <h2>Profile</h2>
                <form className='profile-form' onSubmit={handleProfileSave}>
                    <div className='profile-email'><label>Email</label>{user?.email}</div>
                    {user?.firstName? <li className='profile-firstName'><label>First Name </label>{ user.firstName}</li> :
                    <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    }
                    {user?.lastName? <li className='profile-lastName'><label>Last Name </label>{ user.lastName}</li> :
                    <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    }
                    {!user?.firstName || !user?.lastName ? <button type="submit">Save</button> : <></>}
                </form>
            </div>
                <div className='fit-info'>
                    <h2>Fit</h2>
                    <form className='fit-form' onSubmit={handleProfileSave}>
                        {user?.height_in? <li className='profile-height'><label>Height </label>{`${user.height_in} inches`}</li> :
                        <select value={height_in} onChange={(e) => setHeight(e.target.value)}>
                            <option value=''>Height</option>
                            <option value='48'>less then 5ft</option>
                            <option value='60'>5ft - 5ft 6in</option>
                            <option value='70'>5ft 7in - 6ft</option>
                            <option value='78'>6ft 1in - 6ft 6in</option>
                        </select>
                        }
                        {user?.weight_lbs? <li className='profile-weight'><label>Weight </label>{`${user.weight_lbs} lbs`}</li> :
                        <select value={weight_lbs} onChange={(e) => setWeight(e.target.value)}>
                            <option value=''>Weight</option>
                            <option value='90'>less 90lbs</option>
                            <option value='100'>90lbs - 100lbs</option>
                            <option value='120'>101lbs - 120lbs</option>
                            <option value='130'>121lbs - 130lbs</option>
                            <option value='140'>131lbs - 140lbs</option>
                            <option value='150'>141lbs - 150lbs</option>
                            <option value='160'>151lbs - 160lbs</option>
                            <option value='170'>161lbs - 170lbs</option>
                            <option value='180'>171lbs - 180lbs</option>
                            <option value='190'>181lbs - 190lbs</option>
                            <option value='200'>191lbs - 200lbs</option>
                            <option value='210'>201lbs - 250lbs</option>
                        </select>
                        }
                        {user?.dressSize? <li className='profile-size'><label>Size </label>{ user.dressSize.toUpperCase()}</li> :
                        <select value={dressSize} onChange={(e) => setDressSize(e.target.value)}>
                            <option value=''>Size</option>
                            <option value='s'>Small</option>
                            <option value='m'>Medium</option>
                            <option value='l'>Large</option>
                        </select>
                        }
                        {!user?.height_in || !user?.weight_lbs || !user?.dressSize ? <button type="submit">Save</button> : <></>}
                    </form>
                </div>


        </div>

    )
}

export default Profile;
