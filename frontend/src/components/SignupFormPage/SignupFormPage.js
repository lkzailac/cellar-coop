import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../store/session';

import '../index.css';
import './SignupForm.css';



const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);


    if(sessionUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);

            return dispatch(signup({email, username, password}))
                .catch(async (res) => {
                    const data = await res.json();

                    if(data && data.errors) setErrors(data.errors);
                })
        }
        return setErrors([ 'Confirm Password must match Password.'])
    }

    return (
        <form className = 'signup-form' onSubmit={handleSubmit} >
            <div className='signup-validation-errors'>
                <ul>
                    {errors.map((error) =>
                    <li key={error}>{error}</li>)}
                </ul>
            </div>
            <label>
                Email:
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Username:
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
                Confirm Password:
                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </label>
            <button type='submit'>Sign Up</button>
        </form>
    )
}



export default SignupFormPage;
