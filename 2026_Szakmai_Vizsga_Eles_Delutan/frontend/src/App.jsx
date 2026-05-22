import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tagallamok from '../pages/Tagallamok';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/tagallamok"
                    element={<Tagallamok />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
