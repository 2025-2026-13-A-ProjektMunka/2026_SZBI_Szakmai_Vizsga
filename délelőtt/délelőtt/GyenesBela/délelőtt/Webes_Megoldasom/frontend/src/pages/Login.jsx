import React from 'react'
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [jelszo, setJelszo] = useState('');

  const beJelentkez = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:3800/api/frontend/login', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, jelszo })
      });
      const valasz = await response.json();

      if (response.ok) { window.alert(valasz.msg); window.location.href = '/' }
      else { window.alert(valasz.msg) }
  }
  return (
    <div className='login center'>
      <div className='form-container'>
        <label htmlFor="email">E-mail:</label><br />
        <input onChange={e => setEmail(e.target.value)} type="email" /><br />

        <label htmlFor="jelszo">Jelszó:</label><br />
        <input onChange={e => setJelszo(e.target.value)} type="password" /><br />

        <button onClick={e => beJelentkez(e)}>Bejelentkezés</button>
      </div>
    </div>
  )
}

export default Login