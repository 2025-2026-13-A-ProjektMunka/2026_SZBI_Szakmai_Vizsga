import { Link } from 'react-router-dom'
import './Footer.css';


const Footer = () => {
  return (
    <footer>
<a href='https://www.mavcsoport.hu/' target="_blank" rel="noopener noreferrer">MÁV-CSOPORT</a>
      <a href='https://www.mavcsoport.hu/mav-szemelyszallitas/belfoldi-utazas' target="_blank" rel="noopener noreferrer">Belföldi Utazás</a>
      <a href='https://www.mavcsoport.hu/mav-szemelyszallitas/nemzetkozi-utazas' target="_blank" rel="noopener noreferrer">Nemzetközi Utazás</a>
      <a href='https://www.mavcsoport.hu/ugyfelszolgalat/mav-ugyfelszolgalat' target="_blank" rel="noopener noreferrer">Ügyfészolgálat</a>
      <a href='https://jegy.mav.hu/bejelentkezes?compensationRequest=compensationRequest' target="_blank" rel="noopener noreferrer">Késési biztosítás</a>
      <h1>Elérhetőség: +36 1 2 49 59 69</h1>
      <h1>Az adatokat bizalmasan kezeljük.</h1>
    </footer>
  )
}

export default Footer
