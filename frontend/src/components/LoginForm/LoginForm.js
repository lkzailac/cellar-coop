import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {login} from '../../store/session'

// import '../../index.css';
import './LoginForm.css';



const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(login({ email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    };

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-validation-errors'>
                <ul>
                    {errors.map((error) =>
                    <li key={error}>{error}</li>)}
                </ul>
            </div>
            <label>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Your Email'
                />
            </label>
            <label>

                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Password'
                />
            </label>
            <button className = 'login-button' type='submit'>Log In</button>
        </form>
    )
}


export default LoginForm;
