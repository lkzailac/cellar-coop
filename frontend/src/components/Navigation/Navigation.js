import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from '../LoginForm';
import ProfileDropDown from '../ProfileDropDown';

// import '../../index.css';
import './Navigation.css';


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    if(showMenu) {
      return (
        <ProfileDropDown user={sessionUser} />
      )
    }

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileDropDown user={sessionUser} />
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
              <img onClick={openMenu} src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1619570328/profile-icon_wb06p8.svg' />
            </div>
          </li>
        </ul>
      </nav>

    );
  }

  export default Navigation;
