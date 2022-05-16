import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProductsCards from '../pages/CustomerProductsCards';
import Login from '../pages/Login';
import OrderDetails from '../pages/OrderDetails';
import Register from '../pages/Register';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CustomerProductsCards /> } />
        <Route path="/customer/orders" element={ <OrderDetails /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
