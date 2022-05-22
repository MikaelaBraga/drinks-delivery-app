import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function SaleDetail(props) {
  const { sale } = props;
  const { id } = useParams();


  // const getSale = sales.find((s) => s.id === id);

  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      { sale === id
        && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { product.name }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
                >
                  { product.quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { `${parseFloat(product.unitPrice).toFixed(2)}`.replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { `${parseFloat(product.subTotal).toFixed(2)}`.replace('.', ',') }
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                    onClick={ () => handleClick(product.productId) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) }
    </div>
  );
}

SaleDetail.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
  }).isRequired,
};

export default SaleDetail;
