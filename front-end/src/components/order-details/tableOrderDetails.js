/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import useStatusOrder from '../hooks/orderDetails/useStatusOrder';
import './orderDetail.css';

function TableOrderDetails() {
  const [orders, setOrders] = useState({});
  const [setChangeStatus, changeStatus] = useStatusOrder();
  const { id } = useParams();

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
  }, [id, token, changeStatus]);

  function handleSubmit() {
    setChangeStatus(true);
  }

  const labelSellerName = 'order-details-label-seller-name';
  const labelDeliveryStatus = 'order-details-label-delivery-status';
  const dateInput = orders.saleDate;
  const newDate = new Date(dateInput);

  return (
    <div className="container-order-table">
      <h1>Detalhe do Pedido</h1>
      <table key={ orders.id }>
        <thead>
          <tr className="table-order-info">
            <th
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${orders.id}`}
            </th>
            <th
              data-testid={ 'customer_order_details__element-'.concat(labelSellerName) }
            >
              {`P.Vend: ${orders.seller?.name}`}
            </th>
            <th
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              { newDate.toLocaleDateString('pt-BR') }
            </th>
            <th
              data-testid={ 'customer_order_details__element-'
                .concat(labelDeliveryStatus) }
            >
              { orders.status }
            </th>
            <th className="change-status-button">
              <button
                type="button"
                onClick={ () => handleSubmit() }
                data-testid="customer_order_details__button-delivery-check"
                disabled={ orders.status === 'Pendente' || orders.status === 'Preparando'
              || orders.status === 'Entregue' }
              >
                Marcar como entregue
              </button>
            </th>
          </tr>
          <tr>
            <th>Item</th>
            <th>Descri????o</th>
            <th>Quantidade</th>
            <th>Valor unit??rio</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.products && orders.products.map((op, index) => (
              <tr key={ index }>
                <td
                  className="table-order-item"
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  className="table-order-name"
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  { op.name }
                </td>
                <td
                  className="table-order-quantity"
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { op.quantity.quantity }
                </td>
                <td
                  className="table-order-unitPrice"
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { `R$ ${op.price}` }

                </td>
                <td
                  className="table-order-subTotal"
                  data-testid={
                    `customer_order_details__element-order-sub-total-${index}`
                  }
                >
                  { `R$ ${((op.quantity.quantity) * (op.price)).toFixed(2)}` }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="order-total-price">
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          { `Total: R$ ${orders.totalPrice}`.replace('.', ',') }
        </p>

      </div>
    </div>
  );
}

export default TableOrderDetails;
