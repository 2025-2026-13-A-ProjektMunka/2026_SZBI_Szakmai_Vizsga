// Userprofile.jsx (TELJES KÓD)

import { useContext } from 'react';
import './userProfile.css';
import { useState, useEffect, useRef } from 'react';
import { logoContext } from '../App';

// -------------------------------------------------------------
// 🏋️‍♀️ AVATÁR ADATOK (Edzés Témájú Rajzolt Ikonok)
// -------------------------------------------------------------

// Női (Edzés/Fitness témák)
const FEMALE_AVATARS = [
    // Női edzőterem/fitness ikonok
    {
        id: 'f_1',
        gender: 'female',
        name: 'Női jóga/meditáció',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067825.png',
    },
    {
        id: 'f_2',
        gender: 'female',
        name: 'Női súlyzós edzés',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067838.png',
    },
    {
        id: 'f_3',
        gender: 'female',
        name: 'Női fitness labda',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067827.png',
    },
    {
        id: 'f_4',
        gender: 'female',
        name: 'Női ugrókötél',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067831.png',
    },
    {
        id: 'f_5',
        gender: 'female',
        name: 'Női kerékpározás',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067834.png',
    },
    {
        id: 'f_6',
        gender: 'female',
        name: 'Női futás',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067845.png',
    },
    {
        id: 'f_7',
        gender: 'female',
        name: 'Női Boksz/Harc',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067828.png',
    },
    {
        id: 'f_8',
        gender: 'female',
        name: 'Női sportruházat',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067836.png',
    },
    {
        id: 'f_9',
        gender: 'female',
        name: 'Női stretching',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067837.png',
    },
    {
        id: 'f_10',
        gender: 'female',
        name: 'Női erőedzés',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067830.png',
    },
];

// Férfi (Edzés/Fitness témák)
const MALE_AVATARS = [
    // Férfi edzőterem/fitness ikonok
    {
        id: 'm_1',
        gender: 'male',
        name: 'Férfi súlyzós edzés',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067840.png',
    },
    {
        id: 'm_2',
        gender: 'male',
        name: 'Férfi futás',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067841.png',
    },
    {
        id: 'm_3',
        gender: 'male',
        name: 'Férfi erősember/emelés',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067843.png',
    },
    {
        id: 'm_4',
        gender: 'male',
        name: 'Férfi boksz/harc',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067844.png',
    },
    {
        id: 'm_5',
        gender: 'male',
        name: 'Férfi súlyemelés',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067851.png',
    },
    {
        id: 'm_6',
        gender: 'male',
        name: 'Férfi evezés/úszás',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067847.png',
    },
    {
        id: 'm_7',
        gender: 'male',
        name: 'Férfi labdajáték',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067846.png',
    },
    {
        id: 'm_8',
        gender: 'male',
        name: 'Férfi kettlebell',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067849.png',
    },
    {
        id: 'm_9',
        gender: 'male',
        name: 'Férfi plank/álló edzés',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067850.png',
    },
    {
        id: 'm_10',
        gender: 'male',
        name: 'Férfi dinamikus mozgás',
        url: 'https://cdn-icons-png.flaticon.com/512/3067/3067852.png',
    },
];

const MALE_AVATAR_COUNT = MALE_AVATARS.length;
const FEMALE_AVATAR_COUNT = FEMALE_AVATARS.length;

// -------------------------------------------------------------
// Kezdeti felhasználói adatok (Statikus adatok a kitöltéshez)
// -------------------------------------------------------------

const initialUserProfileStatic = {
    name: 'Felhasználó',
    title: 'Frontend Fejlesztő',
    location: 'Budapest, Magyarország',
    email: 'roman.talp@pelda.hu',
    phone: '+36 30 123 4567',
    bio: 'Több éves tapasztalattal rendelkező, szenvedélyes frontend fejlesztő, főként React, Next.js és modern CSS technológiákkal. Szeretek új dolgokat tanulni és nyílt forráskódú projektekben részt venni.',
    skills: [
        'React',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS3 / Sass',
        'Node.js',
        'Git / GitHub',
        'TypeScript',
    ],
    profilePictureUrl: MALE_AVATARS[0].url, // Kezdő avatár beállítása
};

function UserProfile() {
    const [user, setUser] = useState({});
    const [reservations, setReservations] = useState([]);
    const [initialUserProfile, setInitialUserProfile] = useState(initialUserProfileStatic); // Kezdeti statikus adatokkal feltöltve
    const [selectedPicture, setSelectedPicture] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isAvatarPanelOpen, setIsAvatarPanelOpen] = useState(false);
    
    // ------------------------------
    // ÚJ ÁLLAPOTOK AZ EGYEDI ALERT-HEZ
    // ------------------------------
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ msg: '', isSuccess: true });
    // ------------------------------

    const { setLogo } = useContext(logoContext);

    const fileInputRef = useRef(null);

    const fetchReservations = async (userL) => {
        try {
            const response = await fetch(
                `http://localhost:3500/api/users-frontend/`
            );

            const valasz = await response.json();

            if (response.ok) {
                const reservationsF = valasz.reservations;
                const reser = reservationsF.filter((elem) => {
                    return elem.user._id === userL._id;
                });
                console.log(reser);
                setReservations(reser);
                setLogo(userL.avatar);
                setInitialUserProfile(userL);
            }
        } catch (error) {
            console.log(error.message);
            // Hiba esetén is feltöltjük az alapértelmezett adatokat
            setInitialUserProfile(userL || initialUserProfileStatic);
        }
    };

    useEffect(() => {
        const userL = JSON.parse(localStorage.getItem('user'));
        console.log(userL);
        setUser(userL);
        
        if (userL && userL._id) {
            fetchReservations(userL);
        } else {
            // Ha nincs bejelentkezett felhasználó (userL), a statikus adatokat használjuk
            setInitialUserProfile(initialUserProfileStatic);
        }
    }, []);

    // ------------------------------------------------------------------
    // ÚJ: Alert megjelenítése és elrejtése
    // ------------------------------------------------------------------
    const displayAlert = (msg, isSuccess = true) => {
        setAlertMessage({ msg, isSuccess });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 4000); // 4 másodperc után eltűnik
    };


    const handleProfilePicClick = () => {
        if (!isAvatarPanelOpen) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePicture(reader.result);
                setLogo(reader.result);
                const avatarUrl = reader.result
                handleAvatarSelect(avatarUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarSelect = async (avatarUrl) => {
        console.log(avatarUrl);
        setProfilePicture(avatarUrl);
        setLogo(avatarUrl);
        setIsAvatarPanelOpen(false);
        console.log(user);
        const kep = avatarUrl;
        try {
            const response = await fetch(
                `http://localhost:3500/api/users-frontend/${user._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ kep }),
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const toggleAvatarPanel = () => {
        setIsAvatarPanelOpen((prev) => !prev);
    };

    // ------------------------------------------------------------------
    // ÚJ: Randomizálás Logika
    // ------------------------------------------------------------------
    const handleRandomAvatar = (avatarList) => {
        if (avatarList.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * avatarList.length);
        return avatarList[randomIndex].url;
    };

    const handleRandomMaleAvatar = () => {
        const randomUrl = handleRandomAvatar(MALE_AVATARS);
        if (randomUrl) {
            setProfilePicture(randomUrl);
            setIsAvatarPanelOpen(false);
        }
    };

    const handleRandomFemaleAvatar = () => {
        const randomUrl = handleRandomAvatar(FEMALE_AVATARS);
        if (randomUrl) {
            setProfilePicture(randomUrl);
            setIsAvatarPanelOpen(false);
        }
    };

    // ------------------------------------------------------------------
    // ÚJ: Időpont Lemondása (MODOSÍTVA: alert helyett displayAlert)
    // ------------------------------------------------------------------
    const handleCancelReservation = async (reservationId, trainerName, idopont) => {
        if (!window.confirm(`Biztosan lemondja a foglalást?\nEdző: ${trainerName}\nIdőpont: ${idopont}`)) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3500/api/idopont-foglal/${reservationId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const result = await response.json();

            if (response.ok) {
                // EGYEDI ALERT HASZNÁLATA
                displayAlert(result.msg, true);
                
                // Frissítjük a reservations állapotot, hogy eltűnjön a lemondott időpont
                setReservations(prevReservations =>
                    prevReservations.filter(res => res._id !== reservationId)
                );
            } else {
                // EGYEDI ALERT HASZNÁLATA
                displayAlert(`Hiba a lemondáskor: ${result.msg}`, false);
            }
        } catch (error) {
            console.error('Hiba a lemondási kérés küldésekor:', error);
            // EGYEDI ALERT HASZNÁLATA
            displayAlert('Hiba történt a szerverrel való kommunikáció során.', false);
        }
    };

    // ------------------------------------------------------------------
    return (
        <div className="profile-page-wrapper">
            {/* --------------------------------------------------- */}
            {/* ÚJ: EGYEDI ALERT KOMPONENS */}
            {/* --------------------------------------------------- */}
            {showAlert && (
                <div className={`custom-alert ${alertMessage.isSuccess ? 'success' : 'error'}`}>
                    {alertMessage.msg}
                    <button onClick={() => setShowAlert(false)}>X</button>
                </div>
            )}
            {/* --------------------------------------------------- */}

            <aside
                className={`avatar-panel ${isAvatarPanelOpen ? 'open' : ''}`}
            >
                {isAvatarPanelOpen && (
                    <div className="avatar-content">
                        {/* Bezárás gomb a panel tetején */}
                        <button
                            className="panel-close-button"
                            onClick={toggleAvatarPanel}
                        >
                            ❌ Bezár
                        </button>

                        {/* ÚJ: RANDOMIZÁLÁSI GOMBOK */}
                        <h4>Véletlen választás:</h4>
                        <div className="random-buttons">
                            <button
                                onClick={handleRandomMaleAvatar}
                                className="random-btn male-btn"
                                title="Véletlen férfi edző ikon"
                            >
                                Véletlenszerű Férfi ikon választása 🎲
                            </button>
                            <button
                                onClick={handleRandomFemaleAvatar}
                                className="random-btn female-btn"
                                title="Véletlen női edző ikon"
                            >
                                Véletlenszerű Női ikon választása 🎲
                            </button>
                        </div>

                        <h5 style={{ marginTop: '30px' }}>
                            Kézi választás – Férfi ikonok ({MALE_AVATAR_COUNT}{' '}
                            db)
                        </h5>
                        <div className="avatar-grid">
                            {MALE_AVATARS.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.url}
                                    alt={avatar.name}
                                    title={avatar.name}
                                    className="avatar-icon"
                                    onClick={() =>
                                        handleAvatarSelect(avatar.url)
                                    }
                                />
                            ))}
                        </div>

                        <h5>
                            Kézi választás – Női ikonok ({FEMALE_AVATAR_COUNT}{' '}
                            db)
                        </h5>
                        <div className="avatar-grid">
                            {FEMALE_AVATARS.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.url}
                                    alt={avatar.name}
                                    title={avatar.name}
                                    className="avatar-icon"
                                    onClick={() =>
                                        handleAvatarSelect(avatar.url)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
            </aside>
            <div className="profile-container">
                {/* Avatárválasztó gomb a BAL FELSŐ sarkon */}
                <button
                    className="panel-toggle-button visible-left"
                    onClick={toggleAvatarPanel}
                    title={'Avatárválasztó megnyitása'}
                >
                    🖼️ Avatárok kiválasztása
                </button>
                <header className="profile-header">
                    {/* Rejtett fájl input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {/* Profilkép */}
                    <div
                        className="profile-pic-wrapper"
                        onClick={handleProfilePicClick}
                        title="Kattints a saját kép feltöltéséhez (vagy használd az Avatárválasztót)"
                    >
                        <img
                            src={
                                profilePicture
                                    ? profilePicture
                                    : initialUserProfile.avatar || initialUserProfileStatic.profilePictureUrl
                            }
                            alt={`Profilkép - ${initialUserProfile.name}`}
                            className="profile-pic"
                        />
                        <div className="upload-overlay">Kép feltöltése</div>
                    </div>

                    <h1 className="profile-name">{initialUserProfile.name}</h1>
                    <h2 className="profile-title">
                        {initialUserProfile.title}
                    </h2>
                    <p className="profile-location">
                        <em>{initialUserProfile.location}</em>
                    </p>
                </header>
                {/* --------------------------------------------------- */}
                {/* FOGLALÁSOK LISTÁJA */}
                {/* --------------------------------------------------- */}
                {reservations.map((elem) => {
                    // Ellenőrizzük, hogy lejárt-e az időpont
                    const isExpired = new Date(elem.idopont) < new Date();

                    return (
                        <div
                            className="idopont-kontener"
                            key={elem._id}
                        >
                            <img
                                src={elem.trainer.kep}
                                alt=""
                            />
                            <div className="idopont-info-wrapper">
                                <h1>Edző: {elem.trainer.nev}</h1>
                                <p>Időpont: {elem.idopont}</p>
                            </div>
                            <button
                                onClick={() => handleCancelReservation(elem._id, elem.trainer.nev, elem.idopont)}
                                style={isExpired ? { backgroundColor: '#555' } : {}}
                            >
                                {isExpired ? 'Lejárt időpont törlése' : 'Lemond'}
                            </button>
                        </div>
                    );
                })}
                {/* --------------------------------------------------- */}
                <div className="profile-content">
                    <section className="profile-section">
                        <h3 className="section-title">Edző leírása</h3>
                        <p className="profile-bio">{initialUserProfile.bio || initialUserProfileStatic.bio}</p>
                    </section>

                    <section className="profile-section">
                        <h3 className="section-title">Kapcsolat</h3>
                        <ul className="contact-list">
                            <li>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${initialUserProfile.email || initialUserProfileStatic.email}`}>
                                    {initialUserProfile.email || initialUserProfileStatic.email}
                                </a>
                            </li>
                            <li>
                                <strong>Telefon:</strong>{' '}
                                {initialUserProfile.phone || initialUserProfileStatic.phone}
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;