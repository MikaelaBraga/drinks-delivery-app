import React from 'react';
import useRequestOrders from '../hooks/orders/useRequestOrders';

function Orders() {
  const [orders] = useRequestOrders();
  console.log(orders);
  return (
    <div>
      { orders && orders.map((order, index) => (
        <div key={ index }>
          <p
            data-testid={ `customer_orders__element-order-id-${order.id}` }
          >
            { `Pedido 00${index + 1}` }
          </p>
          <h3
            data-testid={ `customer_orders__element-delivery-status-${order.id}` }
          >
            { order.status }
          </h3>
          <h5
            data-testid={ `customer_orders__element-order-date-${order.id}` }
          >
            { order.saleDate }
          </h5>
          <h5
            data-testid={ `customer_orders__element-card-price-${order.id}` }
          >
            { order.totalPrice }
          </h5>
        </div>
      )) }
    </div>
  );
}

export default Orders;
