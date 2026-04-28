import React, { useState } from 'react';
import './Login.css';
import { useContext } from 'react';
import { logoContext } from '../../App';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        jelszo: '',
    });
    const { setLogo } = useContext(logoContext);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Bejelentkezési adatok:', formData);

        try {
            const response = await fetch(
                'http://localhost:3500/api/login-frontend',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        jelszo: formData.jelszo,
                    }),
                }
            );

            const valasz = await response.json();
            console.log(valasz);

            if (response.ok) {
                const user = valasz.letezoUser;
                console.log(user);

                setLogo(user.avatar);
                window.alert(valasz.msg);
                localStorage.removeItem('isLoggedIn');
                localStorage.setItem('isLoggedIn', 1);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/userProfile';
            } else {
                window.alert(valasz.msg);
            }
        } catch (err) {
            console.error('Hiba a bejelentkezés során:', err);
            alert('Hiba történt a bejelentkezés során.');
        }
    };

    return (
        <div className="login-container">
            <h2>Bejelentkezés</h2>

            <form
                onSubmit={handleSubmit}
                className="login-form"
            >
                <label>Email cím</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Add meg az email címed"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Jelszó</label>
                <input
                    type="password"
                    name="jelszo"
                    id="jelszo"
                    placeholder="Add meg a jelszót"
                    value={formData.jelszo}
                    onChange={handleChange}
                    required
                />

                {/* Elfelejtett jelszó */}
                <div className="forgot-password">
                    <a href="/forgot-password">Elfelejtetted a jelszavad?</a>
                </div>

                <button
                    id='belepgomb'
                    type="submit"
                    className="btn-primary login-btn"
                >
                    Belépés
                </button>
            </form>

            <p className="login-switch">
                Nincs még fiókod? <a href="/register">Regisztrálj</a>
            </p>
        </div>
    );
};

export default Login;
