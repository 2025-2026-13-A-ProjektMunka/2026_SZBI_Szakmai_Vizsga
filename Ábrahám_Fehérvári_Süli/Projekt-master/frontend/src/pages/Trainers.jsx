import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Trainers.css';
import { useNavigate } from 'react-router-dom';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const edzoLeker = async () => {
            try {
                const response = await fetch('http://localhost:3500/api/trainers-frontend');
                const adat = await response.json();
                if (response.ok) {
                    setTrainers(adat.trainers);
                }
            } catch (error) {
                console.error("Hiba az edzők betöltésekor:", error);
            }
        };
        edzoLeker();
    }, []);

    const goToTrainerPage = (trainerId) => {
        navigate(`/trainers/${trainerId}`); 
    }

    return (
        <div className="trainers-page-container">
            <Navbar />

            {/* HERO SZEKCIÓ */}
            <section className="trainers-hero-banner">
                <div className="trainers-hero-inner">
                    <h1 className="trainers-hero-title">Szakértő Edzőink</h1>
                    <p className="trainers-hero-subtitle">Profi csapat a Te sikeredért</p>
                </div>
            </section>

            {/* TARTALOM */}
            <section className="trainers-main-content">
                <div className="trainers-intro-box">
                    <h2 className="trainers-section-title">Válaszd ki a mentorodat</h2>
                    <p className="trainers-section-desc">Kattints a kártyákra a részletes bemutatkozásért és az órarendért.</p>
                </div>

                <div className="trainers-card-grid">
                    {trainers.map((t) => (
                        <div 
                            className="trainers-profile-card" 
                            key={t._id} 
                            onClick={() => goToTrainerPage(t._id)}
                        >
                            <div className="trainers-image-wrapper">
                                <img 
                                    className="trainers-portrait"
                                    src={t.kep || "https://placehold.co/400x500?text=Trainer"} 
                                    alt={t.nev} 
                                />
                                <div className="trainers-card-overlay">
                                    <span className="trainers-overlay-button">Profil megtekintése</span>
                                </div>
                            </div>

                            <div className="trainers-card-info">
                                <h3 className="trainers-name-label">{t.nev}</h3>
                                <span className="trainers-spec-badge">{t.specialization || "Személyi Edző"}</span>
                                
                                <p className="trainers-description-text">
                                    Kattints ide az edző részletes profiljának, tapasztalatainak és szabad időpontjainak megtekintéséhez.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Trainers;