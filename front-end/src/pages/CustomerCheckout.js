import React from 'react';
import CartProvider from '../context/CartProvider';
import Navbar from '../components/navBar/navBar';
import TableProductsCart from '../components/customerCheckout/TableProductsCart';

function CustomerCheckout() {
  return (
    <CartProvider>
      <Navbar />
      <TableProductsCart />
    </CartProvider>
  );
}

export default CustomerCheckout;
