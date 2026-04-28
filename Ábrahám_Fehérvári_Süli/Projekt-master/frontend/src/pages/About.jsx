import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  // Tömb megkeverése
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const edzoLeker = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/trainers-frontend');
        const adat = await response.json();

        if (response.ok && adat.trainers) {
          // Másolat készítése a tömbről, megkeverés, majd az első 3 kiválasztása
          const shuffled = shuffle([...adat.trainers]);
          setTrainers(shuffled.slice(0, 3));
        } else {
          console.error(adat.msg);
        }
      } catch (error) {
        console.error("Hiba az edzők lekérésekor:", error);
      }
    };

    edzoLeker();
  }, []);

  const goToTrainerPage = (trainerId) => {
    navigate(`/trainers/${trainerId}`);
  };

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero szekció */}
      <header className="about-hero">
        <div className="about-hero-content">
          <h1>Rólunk</h1>
          <p>
            A Quarter Fitness több mint egy edzőterem – ez a hely, ahol célokat érünk el, és közösséget építünk.
          </p>
        </div>
      </header>

      {/* Bemutatkozás */}
      <section className="about-section">
        <h2>Kik vagyunk?</h2>
        <p>
          A Quarter Fitness 2022-ben nyitotta meg kapuit Budapesten, 850 m<sup>2</sup>-es területen.
          Célunk, hogy modern, inspiráló és barátságos környezetet biztosítsunk mindenkinek, aki fejlődni szeretne.
        </p>
      </section>

      {/* Felszereltség */}
      <section className="about-section light">
        <h2>Modern felszereltség</h2>
        <p>
          Teremünkben megtalálhatóak a legújabb Technogym és Hammer Strength gépek, 
          funkcionális edzőrész és súlyzós zóna.
        </p>
        <img
          src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1600&q=80"
          alt="Quarter Fitness edzőterem"
          className="about-img"
        />
      </section>

      {/* Személyi edzők szekció */}
      <section className="about-section">
        <h2>Személyi edzőink</h2>
        <p>
          Szakértő személyi edzőink minden vendéghez egyéni figyelemmel fordulnak.
        </p>

        <div className="trainer-cards">
          {trainers.map((elem) => (
            <div 
              className="trainer-card clickable" 
              key={elem._id} 
              onClick={() => goToTrainerPage(elem._id)}
            >
              <div className="trainer-img-container">
                {/* Ha nincs kép, null-t adunk át, így elkerüljük az üres string hibát */}
                <img 
                  src={elem.kep || null} 
                  alt={elem.nev} 
                  loading="lazy"
                />
                <div className="card-overlay">
                  <span>Profil megtekintése</span>
                </div>
              </div>
              <div className="trainer-info">
                <h3>{elem.nev}</h3>
                <p className="click-hint">Kattints a profilra, hogy megtekinthesd az edzőt!</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Küldetés */}
      <section className="about-section light">
        <h2>Küldetésünk</h2>
        <p>
          Célunk, hogy minden vendégünk megtalálja a számára megfelelő utat az egészséges életmódhoz. 
        </p>
      </section>
    </div>
  );
};

export default About;