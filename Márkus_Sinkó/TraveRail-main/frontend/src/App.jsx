import Home from './pages/Home';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Jegy from './components/Jegy';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Viszonylat from './pages/Viszonylat';
import Menetrend from './pages/Menetrend';
import Foglalas from './pages/Foglalas';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}s
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                <Route
                    path="/jegy"
                    element={<Jegy />}
                />
                <Route
                    path="/menetrend"
                    element={<Menetrend />}
                />
                <Route
                    path="/viszonylat"
                    element={<Viszonylat />}
                />
                <Route
                    path="/foglalas"
                    element={<Foglalas />}
                />
                <Route 
                 path="/success" 
                 element={<Success />} />
                <Route 
                path="/cancel" 
                element={<Cancel />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
