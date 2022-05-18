import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProductsCards from '../pages/CustomerProductsCards';
import CustomerCheckout from '../pages/CustomerCheckout';
import Login from '../pages/Login';
import OrderDetails from '../pages/OrderDetails';
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
        <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
        <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
