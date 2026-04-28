import React from 'react';
import './Rules.css';
import Navbar from './Navbar';

const EdzoteremSzabalyzat = () => {
  return (
    <div className="rules-page-wrapper">
      <Navbar />
      
      {/* HERO SZEKCIÓ */}
      <section className="rules-hero-banner">
        <div className="rules-hero-content">
          <h1>Gympower Edzőterem Szabályzat</h1>
          <p>Biztonságos, higiénikus és motiváló környezet mindenkinek – eddz felelősséggel, tisztelettel és szenvedéllyel!</p>
        </div>
      </section>

      {/* SZABÁLYZAT TARTALOM */}
      <div className="rules-content-container">
        <section className="rules-card-section">
          <h2>1. Bevezetés</h2>
          <p>
            Üdvözlünk a <strong>PowerFit Edzőteremben</strong>! Köszönjük, hogy minket választottál az egészséges életmód és a fejlődés helyszínéül. 
            A létesítmény használatával minden vendég elfogadja a jelen házirendet, amely a biztonságos, tiszta és barátságos környezet fenntartását szolgálja. 
          </p>
        </section>

        <section className="rules-card-section">
          <h2>2. Nyitvatartás és belépés</h2>
          <ul className="rules-list">
            <li>Nyitvatartás: hétfőtől vasárnapig, 6:00 – 22:00 óráig.</li>
            <li>Az edzőterembe való belépés kizárólag érvényes bérlettel vagy napijeggyel lehetséges.</li>
            <li>Belépéskor kérjük, használd a recepción kapott belépőkártyát vagy QR-kódot.</li>
            <li>A belépési jogosultság visszaélése (pl. más beléptetése) azonnali kizárással járhat.</li>
          </ul>
        </section>

        <section className="rules-card-section">
          <h2>3. Öltöző és értékmegőrzés</h2>
          <p>
            Az öltöző használata minden vendég számára biztosított, azonban az ott hagyott értéktárgyakért a Szolgáltató felelősséget nem vállal. 
            Javasoljuk, hogy használj zárható szekrényt a személyes holmik tárolására. 
          </p>
        </section>

        <section className="rules-card-section">
          <h2>4. Higiénia és biztonság</h2>
          <ul className="rules-list">
            <li>Minden edzéshez hozz magaddal törölközőt, és használd azt a gépek felületén.</li>
            <li>Kérjük, fertőtlenítsd le a használt eszközöket edzés után a kihelyezett fertőtlenítővel.</li>
            <li>Megfelelő, tiszta váltócipő és edzőruha viselése kötelező.</li>
            <li>Alkoholos vagy tudatmódosító szer hatása alatt történő belépés szigorúan tilos.</li>
          </ul>
        </section>

        <section className="rules-card-section">
          <h2>5. Viselkedés a teremben</h2>
          <ul className="rules-list">
            <li>Tartsd tiszteletben más vendégek edzését, ne foglald feleslegesen a gépeket.</li>
            <li>Kerüld a hangoskodást, trágár beszédet és bármilyen agresszív viselkedést.</li>
            <li>Használat után minden súlyt és eszközt helyezz vissza a kijelölt helyére.</li>
          </ul>
        </section>

        <section className="rules-card-section">
          <h2>6. Edzői szolgáltatások</h2>
          <p>
            Személyi edzéseket kizárólag a PowerFit által hivatalosan engedélyezett trénerek tarthatnak. 
            Külsős edző csak előzetes, írásos engedéllyel dolgozhat a teremben. 
          </p>
        </section>

        <section className="rules-card-section">
          <h2>7. Baleset és felelősség</h2>
          <p>
            A PowerFit Edzőterem minden vendége saját felelősségére használja a létesítmény eszközeit. 
            Sérülés vagy rosszullét esetén azonnal értesítsd a személyzetet!
          </p>
        </section>

        <section className="rules-card-section">
          <h2>8. Házirend megszegése</h2>
          <p>
            Súlyos szabálysértés esetén a tagság ideiglenesen vagy véglegesen felfüggeszthető. 
            Célunk a kulturált és biztonságos sportkörnyezet megőrzése.
          </p>
        </section>

        <section className="rules-card-section">
          <h2>9. Kapcsolat</h2>
          <p>
            Ha kérdésed van, fordulj hozzánk bizalommal: <br />
            📧 <a href="mailto:info@powerfit.hu">info@powerfit.hu</a> <br />
            ☎️ +36 30 123 4567
          </p>
        </section>
      </div>

      
    </div>
  );
};

export default EdzoteremSzabalyzat;