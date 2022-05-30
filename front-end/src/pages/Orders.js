import React from 'react';
import Navbar from '../components/navBar/navBar';
import Orders from '../components/orders/Orders';
import useRequestOrders from '../components/hooks/orders/useRequestOrders';

function OrdersPage() {
  const [orders] = useRequestOrders();

  return (
    <>
      <Navbar />
      <main className="orders">
        { orders && orders.map((order, index) => (
          <Orders order={ order } index={ index } key={ index } />
        )) }
      </main>
    </>
  );
}

export default OrdersPage;
