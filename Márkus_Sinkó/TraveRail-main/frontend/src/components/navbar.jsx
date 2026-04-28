import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    const letUser = JSON.parse(localStorage.getItem("user"));
    // console.log(letUser);

    if (loggedInStatus === 1) {
      setIsLoggedIn(true);
    }

    if (letUser && letUser[0].admin === true) {
      setIsAdmin(true);
    }
  }, []);




  const kijelenkezes = () => {
    window.alert("Sikeres kijelentkezés!");
    localStorage.setItem("isLoggedIn", JSON.stringify(0));
    localStorage.setItem("user", null);
    setIsLoggedIn(false);
    window.location.href = "/";
  };
  return (
    <div className="navbar-kontener">
            <div className="bal-elemek">
              <Link to='/'>Home</Link>
               
              <Link to='/menetrend'>Menetrend</Link>
            </div>
            {isLoggedIn ? 
            <div className="jobb-elemek">
              <button onClick={kijelenkezes}>Kijelentkezés</button>
            </div>  
            
            :
            <div className="jobb-elemek">
              <Link to='/register'>Regisztráció</Link>
               <Link to='/login'>Bejelentkezés</Link>
            </div>
            }
            <div className="navbar-right">
              <span style={{ color: "yellow" }}></span>
  {isAdmin && (
    <Link to="http://localhost:3500/api">Szerver</Link>
    
  )}

  <FaShoppingCart
    className="cart-icon"
    title="Jegyek"
    onClick={() => window.location.href = "/jegy"}
  />
        </div>
    </div>
  );
};

export default Navbar;
