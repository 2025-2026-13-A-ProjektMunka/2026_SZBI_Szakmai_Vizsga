import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Tagallamok from '../pages/Tagallamok';
import Login from '../pages/Login';
import Register from '../pages/Register';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/tagallamok" element={<Tagallamok />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App