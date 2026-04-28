import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Gym from './pages/Gym';
import Trainers from './pages/Trainers';
import Rules from './pages/Rules';
import Login from './pages/Login/Login';
import Navbar from './pages/Navbar';
import Register from './pages/Register/Register';
import UserProfile from './pages/userProfile';
// ÚJ IMPORT: Az egyedi edző oldal komponense
import TrainerDetails from './pages/TrainerDetails';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import Footer from './components/Footer';

export const logoContext = createContext();

function App() {
    const [logo, setLogo] = useState('');

    useEffect(() => { 
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) setLogo(user.avatar);
    }, []);

    return (
        <logoContext.Provider value={{ logo, setLogo }}>
               {' '}
            <BrowserRouter>
                      <Navbar />     {' '}
                <Routes>
                           {' '}
                    <Route
                        path="/"
                        element={<Home />}
                    />
                           {' '}
                    <Route
                        path="/about"
                        element={<About />}
                    />
                           {' '}
                    <Route
                        path="/gym"
                        element={<Gym />}
                    />
                           {' '}
                    <Route
                        path="/trainers"
                        element={<Trainers />}
                    />
                    {/* ÚJ ÚTVONAL: Ez kezeli a /trainers/bármilyenID formátumot */}
                           {' '}
                    <Route
                        path="/trainers/:id"
                        element={<TrainerDetails />}
                    />
                           {' '}
                    <Route
                        path="/rules"
                        element={<Rules />}
                    />
                           {' '}
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                           {' '}
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                           {' '}
                    <Route
                        path="/userProfile"
                        element={<UserProfile />}
                    />
                         {' '}
                </Routes>
                <Footer />
                   {' '}
            </BrowserRouter>
               {' '}
        </logoContext.Provider>
    );
}

export default App;
