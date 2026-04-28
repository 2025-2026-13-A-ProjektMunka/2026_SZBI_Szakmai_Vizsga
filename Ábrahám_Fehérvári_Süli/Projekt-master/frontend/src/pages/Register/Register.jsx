
import React, { useState } from "react";   // 🔵 useState HOZZÁADVA
import "./Register.css";

export default function Register() {
  // 🔵 HIÁNYZÓ STATE-EK
  const [nev, setNev] = useState("");
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [jelszoUjra, setJelszoUjra] = useState("");

  // 🔵 HIÁNYZÓ FUNKCIÓ BEÉPÍTVE
  async function regisztracio(event) {
    event.preventDefault();
    console.log(nev, email, jelszo, jelszoUjra);
    

    if (jelszo !== jelszoUjra) {
      window.alert("A jelszavak nem egyeznek!");
      return;
    }

    const response = await fetch(
      "http://localhost:3500/api/register-frontend",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nev, email, jelszo }),
      }
    );

    const valasz = await response.json();

    if (response.ok) {
      window.alert(valasz.msg);
      window.location.href = "/login";
    } else {
      window.alert(valasz.msg);
    }
  }

  return (
    <div className="register-container">
      <h2>Regisztráció</h2>

      {/* 🔵 onSubmit HOZZÁADVA */}
      <form className="register-form" onSubmit={regisztracio}>
        <label htmlFor="username" id="reg">Felhasználónév</label>
        <input
          type="text"
          id="username"
          placeholder="Add meg a felhasználóneved"
          required
          // 🔵 onChange HOZZÁADVA
          onChange={(e) => setNev(e.target.value)}
        />

        <label htmlFor="email">E-mail cím</label>
        <input
          type="email"
          id="email"
          placeholder="Add meg az e-mail címed"
          required
          // 🔵 onChange HOZZÁADVA
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Jelszó</label>
        <input
          type="password"
          id="password"
          placeholder="Add meg a jelszavad"
          required
          // 🔵 onChange HOZZÁADVA
          onChange={(e) => setJelszo(e.target.value)}
        />

        <label htmlFor="confirm-password">Jelszó megerősítése</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Írd be újra a jelszavad"
          required
          // 🔵 onChange HOZZÁADVA
          onChange={(e) => setJelszoUjra(e.target.value)}
        />

        <button className="auth-btn" type="submit" id="letrehoz">
          Fiók létrehozása
        </button>
      </form>

      <p className="auth-switch">
        Már van fiókod? <a href="/login">Jelentkezz be</a>
      </p>
    </div>
  );
}
