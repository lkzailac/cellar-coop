import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {login} from '../../store/session'

import '../index.css';
import './LoginForm.css';





const LoginForm = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(login({ credential, password }))
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
                Username or Email
                <input
                    type='text'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button className = 'login-button' type='submit'>Log In</button>
        </form>
    )
}


export default LoginForm;
