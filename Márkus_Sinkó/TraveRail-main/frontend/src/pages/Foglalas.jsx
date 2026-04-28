import { useContext, useEffect, useState } from "react";
import "./Foglalas.css";
import { MenetrendContext } from "../context/MenetrendContext";

const Foglalas = () => {
  const [adat, setAdat] = useState({});
  const [honnan, setHonnan] = useState('');
  const [hova, setHova] = useState('');
  const[idopont, setIdopont] = useState('');
  const[kedvezmenyek, setKedvezmenyek] = useState([]);
  const[dat, setDat] = useState('');

  useEffect(() => {
    // console.log(datum);
    
    const mentett = JSON.parse(localStorage.getItem('foglalas'));
    const datum = JSON.parse(localStorage.getItem('datum'));
    const hon = JSON.parse(localStorage.getItem('honnan'));
  	const hov = JSON.parse(localStorage.getItem('hova'));
    setHonnan(hon);
    setHova(hov);
    setIdopont(mentett.idopont);
    setDat(datum);
    console.log(mentett);
    setKedvezmenyek(mentett.viszonylat.kedvezmeny);

    if (mentett) {
      setAdat(mentett.viszonylat);
    }
  }, []);

  if (!adat) {
    return <p>Foglalás betöltése...</p>;
  }

  function fizetes() {
    window.location.href = "/jegy";
  }

  return (
    <div className="foglalas-tarto">
      <h2>{honnan} → {hova}</h2>

      <div className="foglalas-info">
        <p><strong>Indulás:</strong> {dat}, {idopont}</p>
        <p><strong>Ár:</strong> {adat.ar} Ft</p>
        <p><strong>Járat:</strong> {adat.jarat}</p>
        <p><strong>Járat indul:</strong> {adat.induloallomas}</p>
        <p><strong>Járat érkezik:</strong> {adat.celallomas}</p>
        <p><strong>Kedvezmény:</strong> {kedvezmenyek}</p>
        {/* <div>
        <p><strong>Kedvezmények:</strong></p>
      {
        kedvezmenyek.map((elem, index) => (
          <div key={index}>
            <label htmlFor={elem}>{elem}</label>
            <input id={elem} type="checkbox" />
          </div>
        ))
      }</div> */}
      </div>

      <div className="foglalas-kepek">
        {adat.kepek?.map((kep, i) => (
          <img key={i} src={kep} alt="állomás" />
        ))}
      </div>

      <button className="veglegesites-gomb" onClick={fizetes}>
        Foglalás véglegesítése
      </button>
    </div>
  );
};

export default Foglalas;