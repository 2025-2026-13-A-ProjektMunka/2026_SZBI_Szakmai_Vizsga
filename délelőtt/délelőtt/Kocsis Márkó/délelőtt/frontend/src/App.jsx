import React from 'react';
import { Route,Router, BrowserRouter } from 'react-router-dom';
import Home from "./Home";
import Navbar from './Navbar.';
import "./App.css";
import Register from '../Pages/Register';

export const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Router>
        <Route path='/' element={Home}/>
        <Route path='/regisztracio' element={Register}/>

    </Router>
    </BrowserRouter>
  )
};

export default App;
