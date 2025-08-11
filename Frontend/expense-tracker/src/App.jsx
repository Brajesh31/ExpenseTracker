import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from "./Pages/Dashboard/Home.jsx"
import Login from "./Pages/Auth/Login.jsx"
import SignUp from "./Pages/Auth/SignUp.jsx"
import Expense from "./Pages/Dashboard/Expense.jsx";
import Income from "./Pages/Dashboard/Income.jsx";
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react'
import { userDataContext } from './Context/UserContext.jsx'

const App = () => {
  return (
    <div>
      <Toaster />
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/income' element={<Income />} />     
        </Routes>
      
    </div>
  )
}

const Root = () => {
  const { userData, loading } = useContext(userDataContext);

  if (loading) return null; // or a spinner
  return userData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};


export default App;