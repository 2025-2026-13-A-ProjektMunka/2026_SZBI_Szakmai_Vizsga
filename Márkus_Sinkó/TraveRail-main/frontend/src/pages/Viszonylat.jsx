import { useEffect, useState } from "react";
// import { MenetrendContext } from "../context/MenetrendContext";
import './Viszonylat.css';

const Viszonylat = () => {
	const hon = JSON.parse(localStorage.getItem('honnan'));
  	const hov = JSON.parse(localStorage.getItem('hova'));
	const viszony = JSON.parse(localStorage.getItem('viszonylatok'));
	const [nyitottIndex, setNyitottIndex] = useState(null);

	const [viszonylatok, setViszonylatok] = useState([]);
	const [idopontok, setIdopontok] = useState([]);
	const [idoIntervallumok, setIdoIntervallumok] = useState(['0:00']);
	const [indulo, setIndulo] = useState('');
	const [cel, setCel] = useState('');
	const [ar, setAr] = useState(0);
	const [honnan, setHonnan] = useState('');
	const [honnanIndex, setHonnanIndex] = useState(0);
	const [hova, setHova] = useState('');
	const [hovaIndex, setHovaIndex] = useState(0);
	

	
	function erkezesiIdoSzamol(kezdo, tartam) {
		let kezdoIdoOra = +kezdo.split(':')[0];    
		let kezdoIdoPerc = +kezdo.split(':')[1];    
		let tartamIdoOra = +tartam.split(':')[0];
		let tartamIdoPerc = +tartam.split(':')[1];

		let ora =  kezdoIdoOra + tartamIdoOra;
		let perc = kezdoIdoPerc + tartamIdoPerc;

		if ((kezdoIdoPerc + tartamIdoPerc) >= 60) {
			ora += 1
			perc = kezdoIdoPerc + tartamIdoPerc - 60;
		}
		
		let idopont = '';

		if (ora >= 24) {
			ora -= 24;
		}

		if (perc < 10) {
			idopont = `${ora}:0${perc}`
		} else {
			idopont = `${ora}:${perc}`
		}

		return idopont;     
	}

	useEffect(() => {	
		console.log(viszony[0]);
		console.log(viszony[0].idotartamAllomasig);
		let tartam = viszony[0].idotartamAllomasig;

		for (let i = 0; i < tartam.length; i++) {
			let pont = erkezesiIdoSzamol(idoIntervallumok[i], tartam[i]);
			let tomb = idoIntervallumok.push(pont);
			setIdoIntervallumok(tomb);
		}
				
		let atad = [];
		

		for (let i = 0; i < viszony[0].allomasok.length; i++) {
			const objektum = { allomas: viszony[0].allomasok[i], tartam: idoIntervallumok[i]}
			atad.push(objektum);
			
		}

		let tomb = [];
		let arany = 0;

		for (let i = 0; i < viszony[0].idopontok.length; i++) {
			const indIdo = erkezesiIdoSzamol(viszony[0].idopontok[i].split('(')[0], idoIntervallumok[0]);			
			const indIdoHonnan = erkezesiIdoSzamol(viszony[0].idopontok[i].split('(')[0], idoIntervallumok[viszony[0].allomasok.indexOf(hon)]);
			const erkIdoHova = erkezesiIdoSzamol(viszony[0].idopontok[i].split('(')[0], idoIntervallumok[viszony[0].allomasok.indexOf(hov)]);
			const erkIdo = erkezesiIdoSzamol(viszony[0].idopontok[i].split('(')[0], idoIntervallumok[idoIntervallumok.length - 1]);
			const idopontObj = { indIdo, indIdoHonnan, erkIdoHova, erkIdo };
			const erkIdoSzam = +erkIdo.split(':')[0] * 60 + +erkIdo.split(':')[1];
			const indIdoHonnanSzam = +indIdoHonnan.split(':')[0] * 60 + +indIdoHonnan.split(':')[1];
			const erkIdoHovaSzam = +erkIdoHova.split(':')[0] * 60 + +erkIdoHova.split(':')[1];
			const indIdoSzam = +indIdo.split(':')[0] * 60 + +indIdo.split(':')[1];
			arany = (erkIdoHovaSzam - indIdoHonnanSzam) / (erkIdoSzam - indIdoSzam);
			tomb.push(idopontObj);
		}

		console.log(tomb);
		
		
		setViszonylatok(atad)
		setIdopontok(tomb);
		setIndulo(viszony[0].induloallomas)
		setCel(viszony[0].celallomas)
		setAr(viszony[0].ar * arany);
		// setIdopontok(viszony[0].idopontok);
		setHonnan(hon);
		setHonnanIndex(viszony[0].allomasok.indexOf(hon))
		setHova(hov);
		setHovaIndex(viszony[0].allomasok.indexOf(hov))
	}, []);

	const foglalas = (tetel, ar) => {
  	const adat = {
    honnan: honnan,
    hova: hova,
    idopont: tetel.indIdoHonnan,
    ar: ar.toFixed(0),
    viszonylat: viszony[0]
  };

  localStorage.setItem("foglalas", JSON.stringify(adat));
  window.location.href = "/foglalas";
};

	return (
		
		<div className="viszonylat-tarto">
			<div className="cim">{ honnan } ↪  { hova }</div>
			<div className="tartalom">
				<div className="bal-tarto" style={ { backgroundColor: 'rgba(0, 129, 0, 0.8)', paddingRight: '1em' } }>
					<table>
						<tbody>
							{viszonylatok.map((elem, index) => {
								return(
									<tr key={index}>
										{ honnanIndex - 1 < index && index < hovaIndex + 1 ? 
											<>
												<td style={ { textAlign: 'right', fontSize: '28px' } }>{ elem.allomas }</td>
												<td>🔴</td>
												<td style={{ fontSize: '28px'}}>{elem.tartam}</td>
											</>
											:
											<>
												<td style={ { textAlign: 'right', fontSize: '12px' } }>{ elem.allomas }</td>
												<td>🔵</td>
												<td style={{ fontSize: '12px'}}>{elem.tartam}</td>
											</>
										}
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
				<div className="jobb-tarto" style={ { backgroundColor: 'rgba(0, 0, 100, 0.83)' } }>
					<div className="allomas-fejlec">
					<div className="allomasok">
						<span>Viszonylat Honnan</span>
						<span>Honnan</span>
						<span>Hova</span>
						<span>Viszonylat Hova</span>
						<span className="teljes-ar">Teljes Ár</span>
						<span className="teljes-foglalas">Foglalás</span>
						  <span></span> {/* nyíl oszlopa */}
					</div>
					<div className="allomasok">
						<span>{indulo}</span>
						<span>{honnan}</span>
						<span>{hova}</span>
						<span>{cel}</span>
						<span></span>
						<span></span>
					</div>
					</div>
					{idopontok.map((elem, index) => (
  <div key={index}>
    {/* FŐ SOR */}
    <div className="allomasok">
      <span>{elem.indIdo}</span>
      <span>{elem.indIdoHonnan}</span>
      <span>{elem.erkIdoHova}</span>
      <span>{elem.erkIdo}</span>
      <span>{ar.toFixed(0)} Ft</span>

      {/* Foglalás + nyíl */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => foglalas(elem, ar)}>
          Foglalás
        </button>

        <span
          className="row-arrow"
          onClick={() =>
            setNyitottIndex(nyitottIndex === index ? null : index)
          }
        >
          {nyitottIndex === index ? '▲' : '▼'}
        </span>
      </span>
    </div>

    {/* LENYÍLÓ RÉSZ */}
    {nyitottIndex === index && (
      <div className="row-details">
        <div className="details-header">
          <strong>{viszony[0].jarat?.toUpperCase() || 'InterCity'}</strong> 
          <span>
            {indulo} → {cel}
          </span>
        </div>

        <div className="details-row">
          <span>
            Indulás: <strong>{elem.indIdoHonnan}</strong>
          </span>
          <span>
            Érkezés: <strong>{elem.erkIdoHova}</strong>
          </span>
          <span>
            Menetidő: <strong>{viszony[0].idotartam}</strong>
          </span>
        </div>

        <div className="details-services">
          <span>🚆 IC</span>
          <span>❄️ Klíma</span>
          <span>💺 Helyjegy</span>
          <span>🔌 Konnektor</span>
        </div>
      </div>
    )}
  </div>
))}

				</div>
			</div>
		</div>
	);
}

export default Viszonylat;