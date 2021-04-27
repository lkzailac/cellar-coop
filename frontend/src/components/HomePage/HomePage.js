import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

// import '../../index.css';
import './HomePage.css';

const HomePage = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);
    const [clickedButton, setClickedButton] = useState(false)
    const [viewLogin, setViewLogin] = useState(false);
    const [viewSignup, setViewSignup] = useState(false);
    const [isDemo, setIsDemo] = useState(false);

    let sessionContent;

    if (sessionUser) {
        sessionContent = (
            <img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1619544668/favicon_2_xi1adp.png' />
        )
    } else if (!sessionUser && !clickedButton) {
        sessionContent =(
            <>
                <div className='main-user-buttons'>
                    <button type='button' onClick={() => [setClickedButton(true), setViewLogin(true)]}>Login</button>
                    {/* <button type='submit' onClick={handleSignup}>Create an Account</button>
                    <button type='submit' onClick={handleDemo}>Demo Login</button> */}
                </div>
            </>
        )
    } else if (clickedButton && viewLogin) {
        sessionContent =(
            <>
                <LoginForm />
            </>
        )

    } else if (clickedButton && viewSignup) {
        sessionContent = (
            <>
                <SignupForm />
            </>
        )
    }


    return (
        <>
            <header>
                <div>
                    <p>Rent. Sell. Buy.</p>
                </div>
            </header>
            <main>
                <div className='main-images'>
                    <img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1619559236/hom-images_ycck9e.svg'/>
                </div>
                {sessionContent}
                <div className='main-headline'>
                    <h1>Update your closet, without the carbon footprint.</h1>
                </div>
                <div className='main-tagline'>
                    <h2>
                        With rentals starting at up to 90% off retail, your wallet and the planet will thank you.
                    </h2>
                </div>
                <div className='main-book-button'>
                    <button><Link to='/api/items' /> Book a Look</button>
                </div>
            </main>

        </>
    )
}




export default HomePage;
