import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import { CaptainLogout } from './pages/CaptainLogout';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
import 'remixicon/fonts/remixicon.css'
import CaptainHome from './pages/CaptainHome';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>

        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>}/>

        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
          <CaptainHome/>
          </CaptainProtectWrapper>}/>

        <Route path='/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>}/>

          <Route path='/captain-logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>}/>
      </Routes>
    </div>
  )
}

export default App