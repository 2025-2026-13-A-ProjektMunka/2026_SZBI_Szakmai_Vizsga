// LoginForm.jsx
import React, { useState } from "react";
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  // const [error, setError] = useState("");
  
  async function bejelentkezes(event) {
    event.preventDefault();
    console.log({
      email,
      jelszo,
    });


    const response = await fetch('http://localhost:3500/api/login-frontend', {
    	method: 'POST',
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify({ email, jelszo })
    });

    const valasz = await response.json();

    if (response.ok) {
    	window.alert(valasz.msg);
      localStorage.setItem('isLoggedIn', JSON.stringify(1)); 
      localStorage.setItem('user', JSON.stringify(valasz.letezoUser)); 
    	window.location.href = '/';
    } else {
    	window.alert(valasz.msg);
    }
  }

  // const validate = () => {
  //   if (!email.trim()) return "Kérlek add meg az e-mail címet.";
  //   // egyszerű e-mail ellenőrzés
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) return "Érvényes e-mail címet adj meg.";
  //   if (jelszo.length < 6) return "A jelszónak legalább 6 karakter hosszúnak kell lennie.";
  //   return "";
  // };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const err = validate();
  //   if (err) {
  //     setError(err);
  //     return;
  //   }
  //   setError("");

  //    if (email === "markus.rego.benedek@szbiszeged.hu" && jelszo === '123456789')
  //     {
  //       window.location.href = '/jegy';
  //     }
    // ha nincs onLogin prop, alapértelmezett konzol-üzenet
    // if (typeof onLogin === "function") {
    //   // onLogin({ email, jelszo });
     
    // } else {
    //   console.log("Login:", { email, jelszo });
    // }
  // };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div id="login-kontener">
    <form id="login-form"
      onSubmit={(event) => {bejelentkezes(event)}}
      aria-labelledby="login-heading"
      style={{
        margin: "0 auto",
        justifyContent: 'center',
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h1 id="login-heading">Bejelentkezés</h1>

      <div>
        <label htmlFor="email">E-mail cím</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e-mail cím"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          style={{ width: "100%", padding: 6, marginTop: 7 }}
        />
      </div>

      <div>
        <label htmlFor="jelszo">Jelszó</label>
        <input
          id="jelszo"
          name="jelszo"
          type="password"
          placeholder="Írja be a jelszavát."
          value={jelszo}
          onChange={(e) => setJelszo(e.target.value)}
          required
          aria-required="true"
          style={{ width: "100%", padding: 6, marginTop: 7 }}
        />
      </div>

      {/* {error && (
        <div role="alert" aria-live="polite" style={{ color: "crimson" }}>
          {error}
        </div>
      )} */}

      <div id="login-gombok">
        <button type="submit"  style={{ flex: 1, padding: "10px 12px" }} onClick={bejelentkezes}>
          Bejelentkezés 
        </button>
        <p>Ha még nem regisztrált:</p>
        <button
          type="button"
          onClick={handleRegister}
          // style={{
          //   flex: 1,
          //   padding: "10px 12px",
          //   background: "transparent",
          //   border: "1px solid #ccc",
          // }}
        >
          Regisztráció
        </button>
      </div>
    </form>
    </div>
  );
}
