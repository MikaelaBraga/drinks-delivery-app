import React from 'react';
import ProductCard from '../components/customerProducts/CustomerProducts';
import Navbar from '../components/navBar/navBar';

function CustomerProductsCards() {
  return (
    <div className="products-page">
      <Navbar />
      <ProductCard />
    </div>
  );
}

export default CustomerProductsCards;
