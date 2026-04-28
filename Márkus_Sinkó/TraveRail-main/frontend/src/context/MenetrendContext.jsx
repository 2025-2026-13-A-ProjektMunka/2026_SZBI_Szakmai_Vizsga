import { useState, createContext, useEffect } from 'react';

export const MenetrendContext = createContext();

const MenetrendProvider = (props) => {
    const [viszonylatok, setViszonylatok] = useState([]);
    const [honnan, setHonnan] = useState('');
    const [hova, setHova] = useState('');
    const [datum, setDatum] = useState('');

    const hon = localStorage.getItem('honnan');

    useEffect(() => {
        const visz = JSON.parse(localStorage.getItem('viszonylatok'));
        setViszonylatok(visz);
        const hon = JSON.parse(localStorage.getItem('honnan'));
        setHonnan(hon);
        const hov = JSON.parse(localStorage.getItem('hova'));
        setHova(hov);
        const dat = JSON.parse(localStorage.getItem('datum'));
        setDatum(dat);
    }, []);
    
    return (
        <MenetrendContext.Provider
            value={{
                viszonylatok,
                setViszonylatok,
                honnan,
                setHonnan,
                hova,
                setHova,
                datum,
                setDatum,
            }}
        >
            {props.children}
        </MenetrendContext.Provider>
    );
};

export default MenetrendProvider;
