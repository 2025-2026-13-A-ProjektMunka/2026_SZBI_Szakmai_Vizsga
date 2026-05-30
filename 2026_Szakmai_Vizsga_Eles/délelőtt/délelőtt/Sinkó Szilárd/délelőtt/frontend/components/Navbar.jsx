import React from 'react';
import './Navbar.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";

const Navbar = () => {
     return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Register'>Register</Link></li>
                    <li><Link to='/Login'>Login</Link></li>
                    <li><Link to='/Tagorszagok'>Tagorszagok</Link></li>
                    
                </ul>
            </nav>
        </BrowserRouter>
        );
 };

 export default Navbar;