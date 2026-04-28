import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Viszonylat.css";



const Viszonylat = () => {
  const navigate = useNavigate();
  const hon = localStorage.getItem('honnan');
  const hov = localStorage.getItem('hova');
  const viszony = localStorage.getItem('viszonylatok');

  // 👉 EZ AZ EGYETLEN ÁLLAPOT, AMI KELL
  const [ajanlatok, setAjanlatok] = useState([]);
  const [nyitottSor, setNyitottSor] = useState(null);
  const [viszonylatok, setViszonylatok] = useState(null);
  const [honnan, setHonnan] = useState('');
  const [hova, setHova] = useState('');

  // 👉 ITT BONTJUK FEL A MONGODB ADATOT
  useEffect(() => {
    setHonnan(hon);
    setHova(hov);
    setViszonylatok(viszony);
    let ora = 0;
  let perc = 0;
  function erkezesiIdoSzamol(kezdo, tartam) {
    let kezdoIdoOra = +kezdo.split(':')[0];    
    let kezdoIdoPerc = +kezdo.split(':')[1];    
    let tartamIdoOra = +tartam.split(':')[0];
    let tartamIdoPerc = +tartam.split(':')[1];

    ora =  kezdoIdoOra + tartamIdoOra;
    perc = kezdoIdoPerc + tartamIdoPerc;

    if ((kezdoIdoPerc + tartamIdoPerc) > 60) {
      ora += 1
      perc = kezdoIdoPerc + tartamIdoPerc - 60;
    }
    
    let idopont = '';

    if (perc < 10) {
      idopont = `${ora}:0${perc}`
    } else {
      idopont = `${ora}:${perc}`
    }

    return idopont;     
  }
    const viszonylatok = JSON.parse(localStorage.getItem("viszonylatok"));
    if (!viszonylatok || viszonylatok.length === 0) return;
    console.log(viszonylatok);
    
    const egyesitettviszonylatok = [];

    for (let i = 0; i < viszonylatok.length; i++) {
      
      
    }

    const visz = viszonylatok[0];

    const ujAjanlatok = visz.idopontok.map((ido) => ({
      indul: ido.split('(')[0],
      erkez: erkezesiIdoSzamol(ido.split('(')[0], visz.idotartam.split('(')[0]),                // később számolható
      menetido: visz.idotartam.split('(')[0],  // pl. 2:34(IC)
      // atszallas: 0,
      ar: 3190,                  // ideiglenes ár
      // jarat: visz.jarat,
      // honnan: visz.induloallomas,
      // hova: visz.celallomas,
    }));

    setAjanlatok(ujAjanlatok);
  }, []);

  // 👉 Jegyek gomb
  const handleTicketClick = (ajanlat) => {
    navigate("/jegy", { state: { data: ajanlat } });
  };

  return (
    
    <div className="route-planner-container">
      <header className="header">
        <h1>{honnan} {hova}</h1>
      </header>

      <div className="results-header">
        <span>Indulás</span>
        <span>Érkezés</span>
        <span>Menetidő</span>
        {/* <span>Átszállás</span> */}
        <span>Ár</span>
        <span></span>
      </div>

      <main className="results-column">
        {ajanlatok.map((a, index) => (
          <div className="route-card" key={index}>
            
            <div className="summary-row">
              {nyitottSor === index && (
  <div className="row-details">
    <p><strong>Járat:</strong> {a.jarat}</p>
    <p><strong>Útvonal:</strong> {a.honnan} → {a.hova}</p>
  </div>
)}
              <span className="time">{a.indul}</span>
            
              <div className="timeline-segment">
                <div className="timeline-bar"></div>
              <span className="time">{a.erkez}</span>
              </div>

                <span className="duration">{a.menetido}</span>
              {/* <span className="transfers">{a.atszallas} átszállás</span> */}

              <button
                className="price-button"
                onClick={() => handleTicketClick(a)}
              >
                {a.ar} Ft
              </button>

<span
  className="row-arrow"
  onClick={() =>
    setNyitottSor(nyitottSor === index ? null : index)
  }
>
  ▾ 
</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Viszonylat;
