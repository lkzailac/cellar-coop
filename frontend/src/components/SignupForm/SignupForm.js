import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../store/session';

// import '../../index.css';
import './SignupForm.css';



const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
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

            return dispatch(signup({email, password}))
                .catch(async (res) => {
                    const data = await res.json();

                    if(data && data.errors) setErrors(data.errors);
                })
        }
        return setErrors([ 'Passwords must match.'])
    }

    return (
        <form className = 'signup-form' onSubmit={handleSubmit} >
            <div className='signup-validation-errors'>
                <ul>
                    {errors.map((error) =>
                    <li key={error}>{error}</li>)}
                </ul>
            </div>
            <div className='signup-form-inputs'>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'/>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password'/>
                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='Confirm Password'/>
            </div>
            <button type='submit'>Create Account</button>
        </form>
    )
}



export default SignupForm;
