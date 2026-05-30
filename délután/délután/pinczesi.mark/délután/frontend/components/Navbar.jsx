import React, { BrowserRouter, Route, Router } from 'react-router-dom';
import './Navbar.css';
import Home from '../Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

const Navbar = () => {
  return (
    <BrowserRouter className="navi-kontener">
        <Router>
            <header>
                <Link to="/">Home</Link>
            </header>
        </Router>
        <Router>
            <Route>
                <Link to="Register">Regisztráció</Link>
                <Link to="Login">Belépés</Link>
                <Link to="Tagallamok">Tagállamok</Link>
            </Route>
        </Router>
    </BrowserRouter>
  )
}

export default Navbar
