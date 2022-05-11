import React from 'react';
import ProductCard from '../components/customerProducts/CustomerProducts';
import Navbar from '../components/navBar/navBar';
import CartProvider from '../context/CartProvider';

function CustomerProductsCards() {
  return (
    <CartProvider>
      <Navbar />
      <ProductCard />
    </CartProvider>
  );
}

export default CustomerProductsCards;
