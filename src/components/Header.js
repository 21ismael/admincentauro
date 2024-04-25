import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.webp'

export default function Header() {
    return (
        <>
            <header>
                <nav className='container'>
                    <img src={logo} alt="logo" />
                    <ul>
                        <li><NavLink to='./cars'>Cars</NavLink></li>
                        <li><NavLink to='./fleet'>Fleet</NavLink></li>
                        <li><NavLink to='./users'>Users</NavLink></li>
                        <li><NavLink to='./offices'>Offices</NavLink></li>
                        <li><NavLink to='./reservations'>Reservations</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}