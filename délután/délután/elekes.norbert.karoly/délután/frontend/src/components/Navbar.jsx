import {Link} from "react-router-dom"
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/register">Regisztráció</Link>
        <Link to="/login">Bejelentkezés</Link>
        <Link to="/allamok">Államok</Link>
    </div>
  )
}

export default Navbar