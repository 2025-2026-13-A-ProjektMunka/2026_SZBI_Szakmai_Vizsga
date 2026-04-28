import React from 'react';
import './Gym.css';
import Navbar from './Navbar';

const Gym = () => {
  return (
    <div className="gym-page-wrapper">
      <Navbar />

      {/* Hero szekció */}
      <header className="gym-hero-header">
        <div className="gym-hero-content">
          <h1>A Quarter Fitness edzőterem</h1>
          <p>
            Modern felszereltség, prémium gépek és motiváló környezet – minden adott ahhoz, hogy kihozd magadból a maximumot.
          </p>
        </div>
      </header>

      {/* Áttekintés */}
      <section className="gym-main-section gym-intro">
        <h2>850 m<sup>2</sup> tiszta energia</h2>
        <p>
          A Quarter Fitness egy 850 négyzetméteres, tágas és világos edzőterem Budapesten, 
          ahol a legmodernebb Technogym, Life Fitness és Hammer Strength gépek várják a vendégeket.
          Teremünk minden zónája úgy lett kialakítva, hogy a kezdők és a haladók is hatékonyan, kényelmesen és biztonságosan edzhessenek.
        </p>
      </section>

      {/* Gépek és zónák */}
      <section className="gym-main-section gym-zones">
        <h2>Főbb edzészónáink</h2>

        <div className="gym-zone-grid">

          <div className="gym-zone-card">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
              alt="Súlyzós edzés zóna"
            />
            <div className="gym-card-body">
              <h3>Súlyzós edzés zóna</h3>
              <p>
                Több mint 30 különböző súlyzós gép és 4 sor szabad súly (1,25–50 kg között). 
                Találsz Smith-keretet, fekvenyomó padokat, lábgép-sort és professzionális 
                Hammer Strength edzőállomásokat.
              </p>
            </div>
          </div>

          <div className="gym-zone-card">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80"
              alt="Kardió rész"
            />
            <div className="gym-card-body">
              <h3>Kardió részleg</h3>
              <p>
                20+ Technogym és Life Fitness futópad, ellipszis tréner, lépcsőző és szobakerékpár. 
                Minden gép digitális kijelzővel felszerelt a pontos eredménykövetésért.
              </p>
            </div>
          </div>

          <div className="gym-zone-card">
            <img
              src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1600&q=80"
              alt="Funkcionális edzőtér"
            />
            <div className="gym-card-body">
              <h3>Funkcionális edzőtér</h3>
              <p>
                Saját testsúlyos és cross training részleg TRX kötéllel, kettlebellel, medicinlabdákkal 
                és egy nagyméretű funkcionális ketreccel.
              </p>
            </div>
          </div>

          <div className="gym-zone-card">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80"
              alt="Csoportos edzések"
            />
            <div className="gym-card-body">
              <h3>Csoportos edzések terme</h3>
              <p>
                Tágas, tükrös terem fa padlóval, ahol spinning, HIIT, mobility és 
                stretching órákat tartunk naponta többször.
              </p>
            </div>
          </div>

          <div className="gym-zone-card">
            <img
              src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1600&q=80"
              alt="Wellness részleg"
            />
            <div className="gym-card-body">
              <h3>Wellness részleg</h3>
              <p>
                Edzés után lazíthatsz az infra- és finn szaunában. A teljes terület 
                klimatizált és modern öltözőkkel felszerelt.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Összegzés */}
      <section className="gym-main-section gym-summary">
        <div className="gym-summary-container">
          <h2>Felszereltség röviden</h2>
          <ul className="gym-feature-list">
            <li><span>✅</span> 30+ professzionális súlyzós gép</li>
            <li><span>✅</span> 20+ kardió gép – futópad, ellipszis, kerékpár</li>
            <li><span>✅</span> Funkcionális rész TRX, kettlebell, battle rope</li>
            <li><span>✅</span> Csoportos edzőterem és szauna</li>
            <li><span>✅</span> Modern öltözők, zuhanyzók és pihenőrész</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Gym;