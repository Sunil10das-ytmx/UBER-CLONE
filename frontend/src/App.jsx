import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import Userlogin from './pages/Userlogin'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainSignup from './pages/CaptainSingup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainLogout from './pages/CaptainLogout'
import UserprotectWrapper from './pages/UserprotectWrapper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'

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
          <Route path='/riding' element={<Riding/>} />
          <Route path='/user/logout' element={
            <UserprotectWrapper>
              <UserLogout/>
            </UserprotectWrapper>
          } />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome/>
            </CaptainProtectWrapper>
          }/>
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-singup' element={<CaptainSignup/>} />
          <Route path='/captain-logout' element={<CaptainLogout/>} />
        </Routes>
      </div>
  )
}

export default App
