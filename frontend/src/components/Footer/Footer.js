import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';


const Footer = () => {


    return (
        <>
            <footer className='footer-container'>
                <div className='footer-linkedin'>
                    <a href='https://www.linkedin.com/in/laura-zailac/' target="_blank"><img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1620007908/linkedin_dviuyr.png'/></a>
                </div>
                <div className='footer-name'>
                    <p>Laura Zailac</p>
                </div>
                <div className='footer-github'>
                    <Link><img /></Link>
                </div>

            </footer>
        </>

    )
}





export default Footer;
