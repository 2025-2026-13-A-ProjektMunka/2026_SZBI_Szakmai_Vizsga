import React, { useContext, useEffect, useState } from 'react';
import './Menetrend.css'
import allomasok from '../../public/js/adatok';
import { MenetrendContext } from '../context/MenetrendContext';

const Menetrend = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [mivel, setMivel] = useState("");
    const [vanJarat, setvanJarat] = useState(0);
    const [jaratok, setJaratok] = useState([]);
    const [kereses, setKereses] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [menetrendek, setMenetrendek] = useState([]);
    // const [time, setTime] = useState("00:00");
    const { setViszonylatok, setHonnan, setHova, setDatum } = useContext(MenetrendContext);

    useEffect(() => {
        const leker = async () => {
            const response = await fetch(
                'http://localhost:3500/api/schedules-frontend'
            );
            const valasz = await response.json();
            console.log(valasz.schedules);

            if (response.ok) {
                setMenetrendek(valasz.schedules);
            }
        };
        leker();
    }, []);

    const hovaFeldolgoz = (e) => {
        const hova = e.target.value 
        setTo(e.target.value);
        console.log(from);
        let jaratokLeszur = [];
        setvanJarat(0);
        
        for (let i = 0; i < menetrendek.length; i++) {
            let szur = menetrendek[i].induloallomas === from && (menetrendek[i].celallomas === hova || menetrendek[i].allomasok.includes(hova)) ||
                menetrendek[i].celallomas === hova && (menetrendek[i].induloallomas === from || menetrendek[i].allomasok.includes(from)) ||
                menetrendek[i].allomasok.includes(hova) && (menetrendek[i].allomasok.includes(from));
            
            if (szur) {
                setvanJarat(1);
                jaratokLeszur.push(menetrendek[i].jarat);
            }
        }
        
        setJaratok(jaratokLeszur);
    }

    const feldolgozMegnyit = (e) => { 
        setMivel(e);
        setKereses(1);
    };
    
    const feldolgoz = (e) => {
        e.preventDefault();
        console.log({ from, to, mivel, date });
        setDatum(date);
        localStorage.setItem('datum', JSON.stringify(date));
        let viszonyokT = [];
        menetrendek.forEach((elem) => {
            // let tartalmaz = elem.allomasok.filter((item) => item === to);
            // if (
            //     elem.induloallomas === from &&
            //     (elem.celallomas === to || tartalmaz.length > 0) &&
            //     elem.jarat === mivel
            // ) {
            //     // console.log(elem);
            //     viszonyokT.push(elem);
            // }
            let szur = (elem.induloallomas === from && (elem.celallomas === to || elem.allomasok.includes(to)) ||
                elem.celallomas === to && (elem.induloallomas === from || elem.allomasok.includes(from)) ||
                elem.allomasok.includes(to) && (elem.allomasok.includes(from))) && elem.jarat === mivel;
            
            if (szur) {
                viszonyokT.push(elem);
            }
        });
        console.log(viszonyokT);
        if (!viszonyokT[0].allomasok.includes(viszonyokT[0].induloallomas)) viszonyokT[0].allomasok.unshift(viszonyokT[0].induloallomas);
		if (!viszonyokT[0].allomasok.includes(viszonyokT[0].celallomas)) viszonyokT[0].allomasok.push(viszonyokT[0].celallomas);
        console.log(viszonyokT);
        setViszonylatok(viszonyokT);
        localStorage.setItem('viszonylatok', JSON.stringify(viszonyokT));
        setHonnan(from);
        localStorage.setItem('honnan', JSON.stringify(from));
        setHova(to);
        localStorage.setItem('hova', JSON.stringify(to));

        window.location.href = `/viszonylat`;
    };

    return (
        <div id="menetrend-kontener">
            <form id="menetrend-form"
                style={{
                    maxWidth: 450,
                    margin: '0 auto',
                    border: '1px solid #ddd',
                    borderRadius: 12,
                    background: '#fff',
                    
                }}
            >
                <h1 id="menetrend-heading">Menetrend</h1>

                {/* Honnan */}
                <div style={{ marginBottom: 12}}>
                    <label htmlFor="from">Honnan?</label>
                    <select
                        id="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        
                        style={{ width: '100%', padding: 8, marginTop: 6 }}
                    >
                        <option value="">Válassz...</option>
                        {allomasok.sort().map((allomas) => (
                            <option
                                key={allomas}
                                value={allomas}
                            >
                                {allomas}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Hova */}
                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="to">Hova?</label>
                    <select
                        id="to"
                        value={to}
                        onChange={(e) => hovaFeldolgoz(e)}
                        style={{ width: '100%', padding: 8, marginTop: 6 }}
                    >
                        <option value="">Válassz...</option>
                        {allomasok.sort().map((allomas) => (
                            <option
                                key={allomas}
                                value={allomas}
                            >
                                {allomas}
                            </option>
                        ))}
                    </select>
                </div>

                {/* közlekedési eszközök */ }
                {vanJarat ? 
                <div style={{ marginBottom: 12 }}>
                        <label>Közlekedési eszköz: </label>
                        { jaratok.map((elem, index) => (
                            <div key={index}>
                                <label>{elem}: </label>
                                <input type='radio' name="jarat" style={ { color: 'black' } } value={elem} onChange={e => feldolgozMegnyit(e.target.value)} />
                            </div>
                        ))}
                    {/* <label>Személy: </label>
                    <input type='radio' style={ { color: 'black' } } value="IC" onChange={e => setMivel(e.target.value)} /> */}
                    {/* 🚆 🚌 🚋 */}
                    </div>
                    :
                    <div>
                        <p style={ { color: 'black' } }>Nincs közvetlen járat!</p>    
                    </div>
                }
                {/* Mikor */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="date">Mikor?</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ width: '95%', padding: 8, marginTop: 6 }}
                        />
                    </div>
                </div>

                {/* keresés */ }
                { kereses ?
                    <button
                        onClick={ (event) => feldolgoz(event) } 
                        style={ {
                            width: '100%',
                            padding: '12px 0',
                            background: '#ffd500',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 16,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        } }
                    >
                        🔍 Keresés
                    </button> : <div></div>
                }
            </form>
        </div>
    );
};

export default Menetrend;
