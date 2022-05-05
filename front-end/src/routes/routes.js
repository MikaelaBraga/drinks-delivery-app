import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navBar/navBar';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routers() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
