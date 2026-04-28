import './Home.css'
import Navbar from './Navbar'

const Home = () => {
  
  return (
    <div className="home">
      

      {/* Hero szekció */}
      <header className="hero">
        <div className="hero-content">
          <h1>Quarter Fitness</h1>
          <p>
            A modern edzőterem, ahol a személyi edzés nemcsak hatékony, hanem élmény is.
          </p>
          <a href="#training" className="btn-primary">
            Fedezd fel az edzéseket
          </a>
        </div>
      </header>

      {/* Rólunk */}
      <section className="about">
        <h2>Miért válaszd a Quarter Fitness-t?</h2>
        <p>
          A Quarter Fitness a legújabb fitnesztechnológiákkal és modern felszereltséggel vár mindenkit,
          aki fejlődni szeretne. Személyi edzőink segítenek elérni a céljaidat, legyen az izomépítés,
          fogyás, vagy egyszerűen jobb közérzet.
        </p>
      </section>

      {/* Szolgáltatások */}
      <section id="training" className="services">
        <h2>Személyi edzések</h2>
        <div className="service-cards">
          <div className="card">
            <h3>Egyéni edzések</h3>
            <p>
              Teljesen rád szabott edzéstervek, hogy minden mozdulat közelebb vigyen a céljaidhoz.
            </p>
          </div>
          <div className="card">
            <h3>Kiscsoportos tréningek</h3>
            <p>
              Motiváló hangulat, szakértői irányítás és közösségi élmény egyszerre.
            </p>
          </div>
          <div className="card">
            <h3>Funkcionális edzés</h3>
            <p>
              Modern eszközök, változatos gyakorlatok – hogy a tested minden izma dolgozzon.
            </p>
          </div>
        </div>
      </section>

      {/* Felszereltség */}
      <section className="equipment">
        <h2>Modern felszereltség</h2>
        <p>
          Edzőtermünkben a legújabb gépek, súlyzók és funkcionális edzőeszközök állnak rendelkezésedre.
          A higiénia, a kényelem és a hatékonyság nálunk alap.
        </p>
      </section>

      
    </div>
  )
}

export default Home
