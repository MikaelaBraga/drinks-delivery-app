import React from 'react';
import { Link } from 'react-router-dom';
import useRequestOrders from '../hooks/orders/useRequestOrders';

function Orders() {
  const [orders] = useRequestOrders();

  return (
    <div>
      { orders && orders.map((order, index) => (
        <Link to={ `/customer/orders/${order.id}` } key={ index }>
          <div key={ order.id }>
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
        </Link>
      )) }
    </div>
  );
}

export default Orders;
