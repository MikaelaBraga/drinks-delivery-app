import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import useStatusOrder from '../hooks/orderDetails/useStatusOrder';

function TableOrderDetails() {
  const [orders, setOrders] = useState({});
  console.log(orders);
  const [statusOrder, setChangeStatus] = useStatusOrder();
  const { id } = useParams();
  const ten = 10;

  const { token } = JSON.parse(localStorage.getItem(('user')));

  useEffect(() => {
    api.get(`/customer/orders/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  function handleSubmit() {
    setChangeStatus(true);
  }

  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      <table key={ orders.id }>
        <thead>
          <tr>
            <th
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${orders.id}`}
            </th>
            <th
              data-testid="
              customer_order_details__element-order-details-label-seller-name"
            >
              {`P.Vend: ${orders.seller?.name}`}
            </th>
            <th
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {orders.saleDate?.substring(0, ten)}
            </th>
            <th
              data-testid="
              customer_order_details__element-order-details-label-delivery-status"
            >
              { statusOrder }
            </th>
            <button
              type="button"
              onClick={ () => handleSubmit() }
              data-testid="customer_order_details__button-delivery-check"
            >
              Marcar como entregue
            </button>
          </tr>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.products && orders.products.map((op, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  { op.name }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { op.quantity.quantity }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { op.price }

                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-sub-total-${index}`
                  }
                >
                  { (op.quantity.quantity) * (op.price) }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        { `Total: R$ ${orders.totalPrice}` }
      </p>
    </div>
  );
}

export default TableOrderDetails;
