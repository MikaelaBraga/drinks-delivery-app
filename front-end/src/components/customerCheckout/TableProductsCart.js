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
              <td>{ index + 1 }</td>
              <td>{ product.name }</td>
              <td>{ product.quantity }</td>
              <td>{ product.unitPrice }</td>
              <td>{ product.subTotal }</td>
              <td>
                <button
                  type="button"
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>

      <h2>{ totalPrice }</h2>
    </div>
  );
}

export default TableProductsCart;
