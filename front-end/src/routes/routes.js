import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProductsCards from '../pages/CustomerProductsCards';
import CustomerCheckout from '../pages/CustomerCheckout';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <CustomerProductsCards /> } />
        <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
