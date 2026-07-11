import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/Userlogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSingup'
import Home from './pages/Home'
import UserLogout from './pages/UserLogout'
import UserprotectWrapper from './pages/UserprotectWrapper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'

const App = () => {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/home' element={
            <UserprotectWrapper>
              <Home/>
            </UserprotectWrapper>
          } />
          <Route path='/login' element={<Userlogin/>} />
          <Route path='/singup' element={<UserSignUp/>} />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome/>
            </CaptainProtectWrapper>
          }/>
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-singup' element={<CaptainSignup/>} />
          <Route path='/user/logout' element={
            <UserprotectWrapper>
              <UserLogout/>
            </UserprotectWrapper>
          } />
        </Routes>
      </div>
  )
}

export default App
