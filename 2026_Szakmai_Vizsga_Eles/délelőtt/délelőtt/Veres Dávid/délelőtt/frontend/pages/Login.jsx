import "./Login.css"
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [jelszo, setJelszo] = useState('');

    const bejelentkezes = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3800/api/bejelentkezes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, jelszo}),
        });
    }
  return (
    <div className='login-kontener'>
        <form>
            <label htmlFor='email'>E-mail:</label>
            <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} /> <br />

            <label htmlFor='jelszo'>Jelszó</label>
            <input type='password' id='jelszo' onChange={(e) => setJelszo(e.target.value)} /> <br />

            <button type='button' onClick={(e) => bejelentkezes}>Bejelentkezés</button>
        </form>
    </div>
  )
}

export default Login