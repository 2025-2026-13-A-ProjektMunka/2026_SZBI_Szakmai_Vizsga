import { useState, useEffect } from 'react';
import './Tagorszagok.css';

const Tagorszagok = () => {
    const [tagorszagok, setTagorszagok] = useState([]);

    useEffect(() => {
        const letolt = async () => {
            const response = await fetch(
                'http://localhost:3800/api/frontend/tagorszagok',
            );

            const adat = await response.json();

            if (response.ok) {
                setTagorszagok(adat.tagorszagok);
            } else {
                window.alert(adat.message);
            }
        };

        letolt();
    }, []);

    return (
        <div className="tagorszagok-kontener">
            <h1>Tagállamok</h1>
            <div className="tagorszagok-belso-kontener">
                {tagorszagok.map((elem) => (
                    <div
                        className="tagorszag-kontener"
                        key={elem._id}
                    >
                        <div className="szoveg-kontener">
                            <h4>{elem.megye}</h4>
                            <p>Tagállam: {elem.nev}</p>
                            <p>
                                Terület: {elem.terulet} km<sup>2</sup>
                            </p>
                            <p>Lakosság: {elem.lakossag} fő</p>
                            <p>Főváros: {elem.fovaros}</p>
                            <p>Főváros lakosság: {elem.fovarosLakossag} fő</p>
                            <p>Csatlakozás időpontja: {elem.csatlakozas}</p>
                            <p>Hivatalos nyelv(ek): {elem.hivatalosNyelv}</p>
                        </div>
                        <div className="kep-kontener">
                            <img
                                src={elem.zaszlo}
                                alt="Zászló"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tagorszagok;
