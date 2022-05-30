import React from 'react';
import Navbar from '../components/navBar/navBar';
import TableOrderDetails from '../components/order-details/tableOrderDetails';

function OrderDetails() {
  return (
    <>
      <Navbar />
      <div className="order-detail">
        <TableOrderDetails />
      </div>
    </>
  );
}

export default OrderDetails;
