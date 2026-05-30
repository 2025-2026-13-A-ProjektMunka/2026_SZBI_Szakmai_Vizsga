import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-kontener'>
        <Link to="/">Home</Link>
        <Link to="/register">Regisztráció</Link>
        <Link to="/login">Bejelentkezés</Link>
        <Link to="/tagorszagok">Tagországok</Link>
    </div>
  )
}

export default Navbar