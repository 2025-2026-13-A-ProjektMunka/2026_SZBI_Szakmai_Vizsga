import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="fedok">
    <div className="home-kontener">
      <div
        className="welcome-box"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >

        {/* --- 8 KÉP EGY SORBAN --- */}
        <div className="kep-sor" >
          <img src="/images/traxx_480 023.jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/csörgő.jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/kiss .jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/Máv kiss keleti.jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/máv bd.jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/oroshaza.jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/samu.jpg" alt="" style={{ width: "80px", height: "auto" }} />
          <img src="/images/samu.jpg" alt="" style={{ width: "80px", height: "auto" }} />
        </div>
        {/* --- /KÉPSOR --- */}

        <h1 className="welcome-title-style">Szép napot!</h1>
        <p className="welcome-text-style" style={
          {
            border: "2px solid rgba(4, 24, 139, 1)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "rgba(45, 4, 139, 1)",
          }
        }>
          Itt mindent megtalálsz, amire a kényelmes utazáshoz szükséged van.
          <br />
          Kezdésként nézz szét a &nbsp;
          <Link to="/menetrend" className="text-highlight">
            Menetrend
          </Link>
          &nbsp; menüpontban!
        </p>
      </div>
    </div>
    </div>
  );
};

export default Home;