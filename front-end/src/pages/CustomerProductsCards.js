import React from 'react';
import ProductCard from '../components/customerProducts/CustomerProducts';
import Navbar from '../components/navBar/navBar';

function CustomerProductsCards() {
  return (
    <>
      <Navbar />
      <div className="products-page">
        <ProductCard />
      </div>
    </>
  );
}

export default CustomerProductsCards;
