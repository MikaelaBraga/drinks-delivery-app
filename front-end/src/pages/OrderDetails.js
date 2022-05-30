import React from 'react';
import Navbar from '../components/navBar/navBar';
import TableOrderDetails from '../components/order-details/tableOrderDetails';

function OrderDetails() {
  return (
    <div className="order-detail">
      <Navbar />
      <TableOrderDetails />
    </div>
  );
}

export default OrderDetails;
