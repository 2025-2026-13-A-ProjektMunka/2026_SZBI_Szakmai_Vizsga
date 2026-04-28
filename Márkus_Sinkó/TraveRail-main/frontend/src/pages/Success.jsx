import './Success.css';

export default function Success() {

  const veglegesites = () => {
    localStorage.removeItem('foglalas');
    window.location.href = '/';
  };

  return (
    <div className="success-container">
      <h1>Köszönjük a vásárlást!</h1>
      <p>Kellemes utazást kívánunk.</p>
      <button className="success-btn" onClick={veglegesites}>
        Vissza a főoldalra
      </button>
    </div>
  );
}