import React from 'react';
import CartTotalPrice from '../hooks/products/CartTotalPrice';

function TableProductsCart() {
  const cart = JSON.parse(localStorage.getItem('carrinho'));
  const [totalPrice] = CartTotalPrice();

  const cartCheckout = [...cart];

  return (
    <div>
      <h1>Finalizar Pedido</h1>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { cartCheckout && cartCheckout.map((product, index) => (
            <tr key={ index }>
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
                { product.unitPrice }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { product.subTotal }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>

      <h2 data-testid="customer_checkout__element-order-total-price">{ totalPrice }</h2>
    </div>
  );
}

export default TableProductsCart;
