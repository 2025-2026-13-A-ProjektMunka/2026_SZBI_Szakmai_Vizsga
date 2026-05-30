import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import './App.css'
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Tagorszagok from "../pages/Tagorszagok";
import Navbar from "../components/Navbar";

function app() {
    return (
        <BrowserRouter>
        <Navbar />
        <Routes/>
           
                <Route path = "/" component = {<Home/>}></Route>
                <Route path = "/register" component = {<Register/>}></Route>
                <Route path = "/login" component = {<Login/>}></Route>
                <Route path = "/tagorszagok" component = {<Tagorszagok/>}></Route>

        <Routes/>
        </BrowserRouter>
    )
}

export default app;