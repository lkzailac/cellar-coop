import React, { useEffect, useState } from 'react';


const Profile = ({ user }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')

    useEffect(() => {

    }, [firstName])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='profile-container'>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className='profile-email'><label>Email</label>{user.email}</div>
                {user.firstName? <li className='profile-firstName'><label>First Name</label>{user.firstName}</li> :
                <input type='text' placeHolder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                }
                {user.lastName? <li className='profile-lastName'><label>Last Name</label>{user.lastName}</li> :
                <input type='text' placeHolder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                }
                <button type="submit">Save</button>
            </form>
        </div>

    )
}

export default Profile;
