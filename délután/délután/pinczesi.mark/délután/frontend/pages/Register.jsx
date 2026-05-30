import { useState } from 'react';
import './Register.css';

const Register = () => {
    const [nev, setNev] = useState('');
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');

    const regisztracio = async (e) => {
        e.preventDefault();

        if (!nev || !email || !jelszo) {
            window.alert('Minden mezőt kötelező kitölteni!');
            return;
        }

        const response = await fetch(
            'http://localhost:3800/api/frontend/regisztracio',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nev, email, jelszo }),
            },
        );

        const valasz = await response.json();

        if (response.ok) {
            window.alert(valasz.msg);
            window.location.href = '/login';
        } else {
            window.alert(valasz.msg);
        }
    };

    return (
        <div className='register-kontener'>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>Név:</td>
                            <td>
                                <input type="text"
                                        id="nev"
                                        onChange={(e) => setNev(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>E-mail:</td>
                            <td>
                                <input type="email"
                                        id='email'
                                        onChange={(e) => setEmail(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Jelszó:</td>
                            <td>
                                <input type="password"
                                        id='jelszo'
                                        onChange={(e) => setJelszo(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={(e) => regisztracio(e)}>
                                    Regisztráció
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default Register;