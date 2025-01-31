import { useState } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Test from './pages/Test'
import ModalComponent from './pages/ModalComponent'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
function App() {
 

  return (
  //  <Login/>
  //  <Test/>
  // <ModalComponent/>
  //  <Dashboard/>
  //  <Signup/>
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Test/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
