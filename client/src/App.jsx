import { useState } from 'react'
import { Routes,Route} from 'react-router-dom';
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import HomePage from './pages/HomePage'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
      </Routes>
    </div>
  )
}

export default App
