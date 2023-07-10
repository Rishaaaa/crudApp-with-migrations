import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Student from './Student'
import Profile from './Profile'
import Home from './Home'
import AddStudent from './AddStudent'
import EditStudent from './EditStudent'
import Start from './Start'
import StudentDetail from './StudentDetail'
import StudentLogin from './StudentLogin'
import AddAdmin from './AddAdmin'
import EditProfile from './EditProfile'
import StudentProfile from './StudentProfile'



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/student' element={<Student />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/create' element={<AddStudent />}></Route>
          <Route path='/createAdmin' element={<AddAdmin />}></Route>
          <Route path='/studentEdit/:id' element={<EditStudent />}></Route>
          <Route path='/studentprofile/:id' element={<StudentProfile />}></Route>

        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/studentLogin' element={<StudentLogin />}></Route>
        <Route path='/studentdetail/:id' element={<StudentDetail />}></Route>
        <Route path='/profileEdit/:id' element={<EditProfile />}></Route>
        <Route path='/studentEdit/:id' element={<EditStudent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App