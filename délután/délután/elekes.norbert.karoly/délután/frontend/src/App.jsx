import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'


const App = () => {
    return (

        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/allamok' element={<Allamok/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default App