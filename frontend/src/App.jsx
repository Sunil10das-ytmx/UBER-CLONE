import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/Userlogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSingup'
import Home from './pages/Home'

const App = () => {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Userlogin/>} />
          <Route path='/singup' element={<UserSignUp/>} />
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-singup' element={<CaptainSignup/>} />
        </Routes>
      </div>
  )
}

export default App
