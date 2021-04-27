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
      <ul>
        <li>
          <NavLink activeClassName='yellow' activeStyle={{color:'pink'}} exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    );
  }

  export default Navigation;
