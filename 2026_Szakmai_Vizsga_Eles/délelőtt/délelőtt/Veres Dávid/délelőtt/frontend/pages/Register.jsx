import "./Register.css";
import { useState } from 'react'

const Register = () => {

    const [nev, setNev] = useState('');
    const [email, setEmail] = useState('')
    const [jelszo, setJelszo] = useState('');

    const regisztracio = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3800/api/regisztracio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nev, email, jelszo}),
        });
    }
  return (
    <div className='register-kontener'>
        <form>
            <label htmlFor='nev'>Név:</label>
            <input type="text" id='nev' onChange={(e) => setNev(e.target.value)} /> <br />

            <label htmlFor='email'>E-mail:</label>
            <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} /> <br />

            <label htmlFor='jelszo'>Jelszó</label>
            <input type='password' id='jelszo' onChange={(e) => setJelszo(e.target.value)} /> <br />

            <button type='button' onClick={(e) => regisztracio}>Regisztráció</button>
        </form>
    </div>
  )
}

export default Register