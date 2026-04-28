import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Jegy.css";

const Jegy = () => {
  const navigate = useNavigate();
  const [jegy, setJegy] = useState({});
  const [viszony, setViszony] = useState([]);
  const [kepek, setKepek] = useState([]);
  const [darab, setDarab] = useState(1);
  const [dat, setDat] = useState('');

  useEffect(() => {
    const mentett = JSON.parse(localStorage.getItem("foglalas"));
    const datum = JSON.parse(localStorage.getItem('datum'));
    if (mentett) {
      setJegy(mentett);
      setViszony(mentett.viszonylat);
      setKepek(mentett.viszonylat.kepek);
      setDat(datum);
    }
  }, []);

  if (!jegy) {
    return (
      <div style={{ padding: 40 }}>
        <p>Nincs kiválasztott jegy.</p>
        <p>Menj vissza és válassz járatot.</p>
      </div>
    );
  }

  const jegyFoglalas = async () => {
    console.log({ darab: darab, jegy: jegy, ar: viszony.ar * 0.9 });
    
    try {
          const res = await fetch("http://localhost:3500/api/stripe/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ darab: darab, jegy: jegy, ar: viszony.ar * 0.9 }) 
          });

          const data = await res.json();
          console.log(data);
          

          if (data.url) {
            window.location.href = data.url;
          } else {
            console.error("Hiba: Nem érkezett URL a szervertől.");
          }
        } catch (error) {
          console.error("Hálózati hiba:", error);
        }
        navigate('/foglalas');
      };

  const csokkent = () =>  {
    let db = darab;
    if (db > 1) setDarab(db -= 1);
  }

  const novel = () =>  {
    let db = darab;
    setDarab(db += 1);
  }

  return (
    <div className="jegy-tarto">
      <h2>{jegy.honnan} → {jegy.hova}</h2>

      <p><strong>Indulás:</strong> {dat}, {jegy.idopont}</p>
      <p><strong>Ár:</strong> {viszony.ar * 0.9} Ft </p>

      <p>Igényelt jegyek száma: </p>
      <div className="jegyek-szama">
      <button onClick={novel}>+</button>
      <span id="szamlalo">{darab}</span>
      <button onClick={csokkent}>-</button>
      </div>

      <div className="jegy-kepek">
        {kepek.map((kep, i) => (
          <img key={i} src={kep} alt="állomás" />
        ))}
      </div>

      <button onClick={() => jegyFoglalas()}>
        Foglalás
      </button>
    </div>
  );
};

export default Jegy;
