import React from 'react';
import useRequestOrders from '../hooks/orders/useRequestOrders';

function Orders() {
  const [orders] = useRequestOrders();
  return (
    <div>
      { orders && orders.map((order, index) => (
        <div key={ index }>
          <p>{ `Pedido 00${index + 1}` }</p>
          <h3>{ order.status }</h3>
          <h5>{ order.saleDate }</h5>
          <h5>{ order.totalPrice }</h5>
        </div>
      )) }
    </div>
  );
}

export default Orders;
