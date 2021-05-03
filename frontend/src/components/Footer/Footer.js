import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';


const Footer = () => {


    return (
        <>
            <footer className='footer-container'>
                <div className='footer-table'>
                    <ul>
                        <li className='footer-linkedin'>
                            <a href='https://www.linkedin.com/in/laura-zailac/' target="_blank"><img src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1620007908/linkedin_dviuyr.png'/></a>
                        </li>
                        <li className='footer-name'>
                            <p>Laura Zailac</p>
                        </li>
                        <li className='footer-github'>
                            <a href='https://github.com/lkzailac' target="_blank"><img  src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1620051310/gihub_copy_hy6uip.png'/></a>
                        </li>
                    </ul>
                </div>



            </footer>
        </>

    )
}





export default Footer;
