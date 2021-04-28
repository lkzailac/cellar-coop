import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';


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

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      }
      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])



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
            {showMenu && sessionUser && (
              <ProfileDropDown user={sessionUser} />
            )}
          </li>
        </ul>
      </nav>

    );
  }

  export default Navigation;
