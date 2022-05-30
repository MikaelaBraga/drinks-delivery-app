import React from 'react';
import Navbar from '../components/navBar/navBar';
import TableProductsCart from '../components/customerCheckout/TableProductsCart';
import DeliveryDetails from '../components/customerCheckout/DeliveryDetails';

function CustomerCheckout() {
  return (
    <>
      <Navbar />
      <main className="checkout">
        <TableProductsCart />
        <DeliveryDetails />
      </main>
    </>
  );
}

export default CustomerCheckout;
