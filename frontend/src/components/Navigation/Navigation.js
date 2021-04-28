import React from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from '../LoginForm';
import ProfileButton from '../ProfileButton';

// import '../../index.css';
import './Navigation.css';


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
            <li>
                <LoginForm />
                {/* <NavLink activeStyle={{color:'pink'}} to="/login">Log In</NavLink> */}
            </li>
            <li>
                <NavLink activeStyle={{color:'pink'}} to="/signup">Sign Up</NavLink>
            </li>

        </>
      );
    }

    return (
      <nav>
        <ul>
          {/* {isLoaded && sessionLinks} */}
          <li>
            <div className='home-icon'>
              <NavLink exact to='/'><img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1619569429/home-icon_uhppxm.svg' /></NavLink>
            </div>
          </li>
          <li>
            <div className='item-icon'>
              <NavLink to='/items'><img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1619570332/item-icon_yeqtt6.svg' /></NavLink>
            </div>
          </li>
          <li>
            <div className='profile-icon'>
              <img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1619570328/profile-icon_wb06p8.svg' />
            </div>
          </li>
        </ul>
      </nav>

    );
  }

  export default Navigation;
