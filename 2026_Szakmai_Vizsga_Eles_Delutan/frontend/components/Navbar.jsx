import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-kontener">
            <Link to="/">Home</Link>
            <Link to="/register">Regisztráció</Link>
            <Link to="/login">Belépés</Link>
            <Link to="/tagallamok">Tagállamok</Link>
        </div>
    );
};

export default Navbar;
