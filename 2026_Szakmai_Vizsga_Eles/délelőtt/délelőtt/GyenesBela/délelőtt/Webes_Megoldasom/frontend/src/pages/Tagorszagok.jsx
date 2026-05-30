import React from 'react'
import { useState, useEffect } from 'react'

import './Tagorszagok.css'

const Tagorszagok = () => {
  const [tagallamok, setTagallamok] = useState([]);
  useEffect(() => {
    const tagorszagokLeker = async () => {
      const response = await fetch('http://localhost:3800/api/frontend/download');
      const valasz = await response.json();
      if (response.ok) { setTagallamok(valasz.countries) }
      else { valasz.msg }
    };
    tagorszagokLeker();
  }, [])
  return (
    <>
        <h1 style={{color: 'red', textShadow: '4px 4px 4px rgba(0,0,0,1)',}}>Tagállamok</h1>

        <div className='tagallamok'>
      {tagallamok.map(tagallam => (
        
        <div className='tagallam center' key={tagallam.nev}>

          <div className='belsoGrid'>
            <div>
              <li>Tagállam: {tagallam.nev}</li>
              <li>Terület: {tagallam.terulet} km²</li>
              <li>Lakosság: {tagallam.lakossag} fő</li>

              <li>Főváros: {tagallam.fovaros}</li>
              <li>Főváros lakosság: {tagallam.fovarosLakossag} fő</li>
              <li>Csatlakozás időpontja: {tagallam.csatlakozas}</li>
              <li>Hivatalos nyelv(ek): {tagallam.hivatalosNyelv}</li>
            </div>
            <div>
              <div className='img-wrapper'><img src={tagallam.zaszlo} alt={tagallam.nev} /></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>

  )
}

export default Tagorszagok