/* eslint-disable react/jsx-max-depth */
import React from 'react';
import useRequestSaleById from '../hooks/sales/useRequestSaleById';
import api from '../../services/api';
import './saleDetail.css';

function SaleDetail() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [sale, setChangeStatus] = useRequestSaleById();
  const { products } = sale;

  function handleClickPreparingCheck(id) {
    const preparing = { status: 'Preparando' };
    api.put(`/seller/orders/${id}`, preparing, { headers: { Authorization: token } });

    setChangeStatus(true);
  }

  function handleClickDispatchCheck(id) {
    const dispatch = { status: 'Em Trânsito' };
    api.put(`/seller/orders/${id}`, dispatch, { headers: { Authorization: token } });

    setChangeStatus(true);
  }

  const dateInput = sale.saleDate;
  const newDate = new Date(dateInput);
  const dataTestidLabelStatus = 'order-details-label-delivery-status';
  return (
    <div className="container-sale-detail">
      <h1>Detalhe do Pedido</h1>

      <table>
        <thead>
          <tr className="sale-detail-info">
            <th
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              { `Pedido 00${sale.id}` }
            </th>
            <th
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { newDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
            </th>
            <th
              data-testid={ `seller_order_details__element-${dataTestidLabelStatus}` }
            >
              { sale?.status }
            </th>
            <th className="change-status-button">
              <button
                type="button"
                data-testid="seller_order_details__button-preparing-check"
                onClick={ () => handleClickPreparingCheck(sale.id) }
                disabled={ sale?.status !== 'Pendente' }
              >
                Preparar Pedido
              </button>
            </th>
            <th className="change-status-button">
              <button
                type="button"
                data-testid="seller_order_details__button-dispatch-check"
                onClick={ () => handleClickDispatchCheck(sale.id) }
                disabled={ sale?.status === 'Pendente' || sale?.status === 'Em Trânsito'
          || sale?.status === 'Entregue' }
              >
                Saiu para entrega
              </button>
            </th>
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
          { products && products.map((p, index) => (
            <tr key={ index }>
              <td
                className="sale-item"
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="sale-name"
                data-testid={ `seller_order_details__element-order-table-name-${index}` }
              >
                { p.name }
              </td>
              <td
                className="sale-quantity"
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                { p.quantity.quantity }
              </td>
              <td
                className="sale-unitPrice"
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${p.price}` }
              </td>
              <td
                className="sale-subTotal"
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${((p.quantity.quantity) * (p.price)).toFixed(2)}` }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <div className="sale-totalPrice">
        <strong
          data-testid="seller_order_details__element-order-total-price"
        >
          { `Total: R$ ${sale.totalPrice}`.replace('.', ',') }
        </strong>
      </div>
    </div>
  );
}

export default SaleDetail;
