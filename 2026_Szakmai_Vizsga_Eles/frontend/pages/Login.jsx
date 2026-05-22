import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');

    const belepes = async (e) => {
        e.preventDefault();

        if (!email || !jelszo) {
            window.alert('Minden mezőt kötelező kitölteni!');
            return;
        }

        const response = await fetch(
            'http://localhost:3800/api/frontend/belepes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, jelszo }),
            },
        );

        const valasz = await response.json();

        if (response.ok) {
            window.alert(valasz.msg);
            window.location.href = '/';
        } else {
            window.alert(valasz.msg);
        }
    };

    return (
        <div>
            <div className="login-kontener">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>E-mail:</td>
                                <td>
                                    <input
                                        type="email"
                                        id="email"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Jelszó:</td>
                                <td>
                                    <input
                                        type="password"
                                        id="jelszo"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button>Bejelentkezés</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Login;
