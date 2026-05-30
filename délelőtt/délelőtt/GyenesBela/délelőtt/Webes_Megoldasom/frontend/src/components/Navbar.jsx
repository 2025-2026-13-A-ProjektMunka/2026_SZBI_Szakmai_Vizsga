import './Navbar.css'

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Regisztráció</Link>
      <Link to="/login">Belépés</Link>
      <Link to="/tagorszagok">Tagországok</Link>
    </nav>
  )
}

export default Navbar