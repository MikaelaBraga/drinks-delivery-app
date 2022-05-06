import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProductsCards from '../pages/CustomerProductsCards';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
<<<<<<< HEAD
        <Route path="/customer/products" element={ <CustomerProductsCards /> } />
=======
        <Route path="/register" element={ <Register /> } />
>>>>>>> 0fe4f669b9c95b4744c02994189c1eb116fbd2c1
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
