import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register/Register'
import Home from './pages/Home'
import Login from './components/Login/Login';
import AddApplication from './components/AddApplication/AddApplication';
import './App.css';
import ApplicationListPage from './pages/Applicationlist';
import AllApplicationPage from './pages/AllApplication';
import SlotsPage from './pages/Slots';
import AdminLogin from './components/AdminLogin/AdminLogin';
import UserManagement from './pages/UserManagement' 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/add-application' element={<AddApplication />} />
          <Route exact path='/admin/applicationList' element={<ApplicationListPage />} />
          <Route exact path='/admin/allapplication' element={<AllApplicationPage />} />
          <Route exact path='/admin/slots' element={<SlotsPage/>}/>
          <Route exact path='/admin/login' element={<AdminLogin/>}/>
          <Route exact path='/admin/user-management' element={<UserManagement/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App;
