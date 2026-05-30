import Home from '../Home';
import Navbar from '../components/Navbar';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Tagallamok from '../Tagalamok'
import { BrowserRouter, Router, Route } from 'react-router-dom';

function App () {
    return (
    <BrowserRouter>
        <Router>
        </Navbar>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Regiszter/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/tagallamok' element={<Tagallamok/>} />
        </Router>
    </ BrowserRouter>
        );
}

export default App;
