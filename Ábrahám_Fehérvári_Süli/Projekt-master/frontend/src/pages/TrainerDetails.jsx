import React, { useState, useEffect, useMemo } from 'react';
import './TrainerDetails.css';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import BookingModal from './BookingModal';

// -----------------------------------------------------------
// Szimulált Időpont Sávok Generálása és Állapotának Kiszámítása
// -----------------------------------------------------------
const generateAvailableTimes = (date, bookedTimes = []) => {
    // A mai nap dátuma (YYYY-MM-DD formátumban)
    const todayString = new Date().toISOString().split('T')[0];
    // A jelenlegi idő
    const now = new Date();

    // Ha nincs dátum kiválasztva, vagy a dátum a múltban van, üres tömböt ad vissza.
    if (!date || new Date(date) < new Date(todayString))
        return [];
    
    // Ideális idősávok, amikben az edző elvileg dolgozik (Pl. 30 percenként)
    const allTimes = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    ];

    // 1. Kiszűrjük azokat az időpontokat a 'foglalt' listából, amelyek a selectedDate napra vonatkoznak
    const timesBookedOnSelectedDate = bookedTimes
        .filter((booking) => booking.date === date)
        .map((booking) => booking.time);

    // 2. Létrehozzuk az összes időpont listáját az állapotukkal együtt
    const allSlots = allTimes.map((time) => {
        
        // --- IDŐPONT ELLENŐRZÉS MÚLT BELI ÁLLAPOTRA ---
        
        // Létrehozunk egy teljes dátum/idő objektumot az aktuális időpontból
        const [hour, minute] = time.split(':').map(Number);
        const slotDateTime = new Date(date);
        slotDateTime.setHours(hour, minute, 0, 0); // Beállítjuk az időpontot

        // A sáv MÚLTBAN VAN-E? (Csak a mai napon kell vizsgálni)
        const isPast = (date === todayString) && (slotDateTime < now);
        
        // --------------------------------------------

        return {
            time: time,
            // Ha az időpont benne van a foglalt listában VAGY a múltban van a mai napon, akkor isBooked: true
            isBooked: timesBookedOnSelectedDate.includes(time) || isPast,
            isPast: isPast, // Extraként, a formázáshoz jól jöhet
        };
    });

    return allSlots;
};
// -----------------------------------------------------------

const TrainerDetails = () => {
    const { id } = useParams();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Állapot a modal láthatóságához
    const [isModalOpen, setIsModalOpen] = useState(false);
    // A mai dátum a naptár korlátozásához
    const today = new Date().toISOString().split('T')[0];
    
    useEffect(() => {
        const userL = JSON.parse(localStorage.getItem('user'));
        console.log(userL);
        setUser(userL);
    }, [])

    useEffect(() => {
        const fetchTrainerDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `http://localhost:3500/api/trainers/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        'Edző adatok lekérése sikertelen! Lehet, hogy az edző nem létezik.'
                    );
                }

                const adat = await response.json();
                console.log(adat.trainer.foglalt);

                // --- ADAT KONVERZIÓ ÉS NORMÁLÁS ---
                let convertedBooked = [];
                if (
                    adat.trainer.foglalt &&
                    Array.isArray(adat.trainer.foglalt)
                ) {
                    // Ellenőrizzük, hogy a foglalt elemei stringek-e (pl. ["2025-12-04,09:30"])
                    if (typeof adat.trainer.foglalt[0] === 'string') {
                        convertedBooked = adat.trainer.foglalt.map((slot) => {
                            const [datePart, timePart] = slot.split(',');
                            return {
                                date: datePart.trim(),
                                time: timePart.trim(),
                            };
                        });
                    } else {
                        // Ha már objektumok (a kívánt formátum: [{ date, time }]), akkor megtartjuk
                        convertedBooked = adat.trainer.foglalt;
                    }
                }
                // Ha a MongoDB-ben hiányzott a "foglalt" mező, használjuk a teszt adatokat
                else {
                    // Szimulált, tesztelési adatok a korábbi példa szerint:
                    convertedBooked = [
                        { date: '2025-12-04', time: '09:30' }, // Az általad kért foglalt időpont
                        { date: today, time: '10:00' },
                        { date: '2025-12-10', time: '14:30' },
                    ];
                }
                // ------------------------------------

                const finalTrainerData = {
                    ...adat.trainer,
                    foglalt: convertedBooked,
                };

                setTrainer(finalTrainerData);
            } catch (err) {
                console.error('Hiba az edző adatainak lekérésekor:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTrainerDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="detail-container p-8 text-center">
                <p>Adatok betöltése...</p>
            </div>
        );
    }

    if (error || !trainer) {
        return (
            <div className="detail-container p-8 text-center text-red-600">
                <p>Hiba történt: {error || 'Edző nem található.'}</p>
            </div>
        );
    }
    // Foglalás Kezelő: Ez fut le, ha sikeres a foglalás a modálban
    const handleBooking = (selectedDate, selectedTime) => {
        if (selectedDate && selectedTime) {
            window.alert(`Sikeresen elküldtük az előjegyzési kérelmet ${trainer.nev} edzőhöz a(z) ${selectedDate}, ${selectedTime} időpontra!
            
// **Ide kell majd a POST kérés a backendnek az új foglalás hozzáadására!**
// A küldendő adat: { date: selectedDate, time: selectedTime }
            
ADATBÁZIS MENTÉS IDE JÖN! (Küldd el ezt az adatot a backendnek POST kéréssel)`);

            // Bezárjuk a modal-t
            setIsModalOpen(false);

            // fetchTrainerDetails(); // Javasolt: Foglalás után újra kellene tölteni az edző adatait
        } else {
            alert('Kérlek, válassz ki egy dátumot ÉS időpontot a foglaláshoz!');
        }
    };

    // Adatok megjelenítése
    return (
        <>
            <Navbar />
            <div className="trainer-detail-page">
                               {/* Fejléc */}
                <div className="trainer-header">
                    <img
                        src={
                            trainer.kep ||
                            'https://placehold.co/150x150/EEEEEE/333333?text=Edz%C5%91'
                        }
                        alt={trainer.nev}
                        className="trainer-profile-img"
                    />
                    <h1>{trainer.nev}</h1>
                </div>
                {/* Részletek */}
                <div className="trainer-info">
                    <h2>Személyi edzési szolgáltatások</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <p className="label">Speciális terület:</p>
                            <p className="value">
                                {trainer.specialization || 'Nincs megadva'}
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="label">Ár (kb.):</p>
                            <p className="value price">
                                {`${trainer.ar} Ft` || 'Kérjen árajánlatot'}
                            </p>
                        </div>
                    </div>
                                        <h3>Bemutatkozás és módszer</h3>
                    <p className="trainer-description">
                        {trainer.experience ||
                            'Jelenleg nincs részletes leírás a backendről. Ideális esetben itt jelenne meg az edző tapasztalata, filozófiája, és az, hogy milyen eredményeket ért el korábban az ügyfeleivel.'}
                    </p>
                                        <h3>Kapcsolat</h3>
                    <div className="contact-info">
                        <p className="contact-email">
                            E-mail:{' '}
                            <span className="email-value">
                                {trainer.elerhetoseg || '—'}
                            </span>
                        </p>
                                        {/* GOMB: Modal megnyitása */}
                        <button
                            className="book-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Időpontot foglalok
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL KOMPONENS - Átadjuk a szűrési függvényt */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // trainerId={trainer._id}
                // trainerName={trainer.nev}
                user={user}
                trainer={trainer}
                today={today}
                // Ez a függvény adja át a foglalt adatokat a generateAvailableTimes-nek
                generateTimes={(date) =>
                    generateAvailableTimes(date, trainer.foglalt)
                }
                onSubmit={handleBooking}
            />
        </>
    );
};

export default TrainerDetails;