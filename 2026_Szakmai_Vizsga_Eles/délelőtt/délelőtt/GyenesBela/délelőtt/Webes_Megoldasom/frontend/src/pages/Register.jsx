import React from 'react'
import { useState } from 'react'

import './Register.css'

const Register = () => {
    const [nev, setNev] = useState('');
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');

    const beRegisztral = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3800/api/frontend/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nev, email, jelszo })
        });
        const valasz = await response.json();

        if (response.ok) { window.alert(valasz.msg); window.location.href = '/login' }
        else { window.alert(valasz.msg) }
    }

  return (
    <div className='register center'>
        <div className='form-container'>
            <label htmlFor="nev">Név:</label><br />
            <input onChange={e => setNev(e.target.value)} type="text" /><br />

            <label htmlFor="email">E-mail:</label><br />
            <input onChange={e => setEmail(e.target.value)} type="email" /><br />

            <label htmlFor="jelszo">Jelszó:</label><br />
            <input onChange={e => setJelszo(e.target.value)} type="password" /><br />

            <button onClick={e => beRegisztral(e)}>Regisztráció</button>
        </div>
    </div>
  )
}

export default Register