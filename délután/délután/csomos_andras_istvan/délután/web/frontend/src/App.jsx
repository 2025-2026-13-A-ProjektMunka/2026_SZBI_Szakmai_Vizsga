import './App.css';
import '../components/Navbar.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tagallamok from '../pages/Tagallamok.jsx';

const App = () => {
  return (
    <div className='app-kontener'>
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route 
                    path='/'
                    element= {< Home /> }
                />
                <Route 
                    path='/register'
                    element={ <Register/>}
                />
                <Route 
                    path='/login'
                    element={ <Login/>}
                />
                <Route 
                    path='/tagallamok'
                    element={ <Tagallamok/>}
                />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
