import { useState } from 'react'
import { Routes,Route} from 'react-router-dom';
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
      </Routes>
    </div>
  )
}

export default App
