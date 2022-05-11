import React from 'react';
import ProductCard from '../components/customerProducts/CustomerProducts';
import CartProvider from '../context/CartProvider';

function CustomerProductsCards() {
  return (
    <CartProvider>
      <ProductCard />
    </CartProvider>
  );
}

export default CustomerProductsCards;
