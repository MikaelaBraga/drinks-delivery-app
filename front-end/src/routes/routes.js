import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProductsCards from '../pages/CustomerProductsCrads';
import Login from '../pages/Login';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/customer/products" element={ <CustomerProductsCards /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
