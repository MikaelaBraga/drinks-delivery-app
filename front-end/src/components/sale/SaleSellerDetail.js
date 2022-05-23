import React from 'react';
import useRequestSaleById from '../hooks/sales/useRequestSaleById';
import api from '../../services/api';

function SaleDetail() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [sale] = useRequestSaleById();
  const { products } = sale;

  function handleClickPreparingCheck(id) {
    const preparing = { status: 'Preparando' };
    api.put(`/seller/orders/${id}`, preparing, { headers: { Authorization: token } });
  }

  function handleClickDispatchCheck(id) {
    const dispatch = { status: 'Em Trânsito' };
    api.put(`/seller/orders/${id}`, dispatch, { headers: { Authorization: token } });
  }

  const dateInput = sale.saleDate;
  const newDate = new Date(dateInput);
  const dataTestidLabelStatus = 'order-details-label-delivery-status';
  return (
    <div>
      <h1>Detalhe do Pedido</h1>

      { sale
      && (
        <div className="saleDetail">
          <p
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            { `Pedido 00${sale.id}` }
          </p>
          <p
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            { newDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
          </p>
          <strong
            data-testid={ `seller_order_details__element-${dataTestidLabelStatus}` }
          >
            { sale?.status }
          </strong>

          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            onClick={ () => handleClickPreparingCheck(sale.id) }
            disabled={ sale?.status !== 'Pendente' }
          >
            Preparar Pedido
          </button>

          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            onClick={ () => handleClickDispatchCheck(sale.id) }
            disabled={ sale?.status === 'Pendente' || sale?.status === 'Em Trânsito' }
          >
            Saiu para entrega
          </button>
        </div>
      )}

      <table className="saleProducts">
        <thead>
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
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${index}` }
              >
                { p.name }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                { p.quantity.quantity }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                { p.price }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                { ((p.quantity.quantity) * (p.price)).toFixed(2) }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <strong
        data-testid="seller_order_details__element-order-total-price"
      >
        { `${sale.totalPrice}`.replace('.', ',') }
      </strong>
    </div>
  );
}

export default SaleDetail;
