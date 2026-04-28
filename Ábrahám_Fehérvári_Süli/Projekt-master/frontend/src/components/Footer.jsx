import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Brand Szekció */}
        <div className="footer-brand">
          <h2>QUARTER <span>FITNESS</span></h2>
          <p>
            Prémium edzőtermi élmény a legmodernebb gépekkel és szakértő edzőkkel. 
            Érd el a céljaidat nálunk!
          </p>
        </div>

        {/* Kapcsolat Szekció */}
        <div className="footer-section">
          <h3>Elérhetőség</h3>
          <ul className="footer-list">
            <li><span className="footer-icon">📍</span> 1234 Budapest, Kondi utca 4.</li>
            <li><span className="footer-icon">📞</span> +36 30 123 4567</li>
            <li><span className="footer-icon">✉️</span> info@quarterfitness.hu</li>
          </ul>
        </div>

        {/* Nyitvatartás és Social */}
        <div className="footer-section">
          <h3>Kövess minket</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/">FACEBOOK</a>
            <a href="https://www.instagram.com/">INSTAGRAM</a>
          </div>
          
          <div className="opening-hours">
            <p>Hétfő - Péntek: <span>06:00 - 22:00</span></p>
            <p>Szombat - Vasárnap: <span>08:00 - 20:00</span></p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} QUARTER Fitness. Minden jog fenntartva.</p>
      </div>
    </footer>
  );
};

export default Footer;