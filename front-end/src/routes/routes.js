import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProductsCards from '../pages/CustomerProductsCards';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SellerOrders from '../pages/SellerOrders';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CustomerProductsCards /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
