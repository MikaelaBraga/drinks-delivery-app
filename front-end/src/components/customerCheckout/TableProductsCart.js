import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartProvider';
import useCartTotalPrice from '../hooks/products/useTotalPrice';
import './customerCheckout.css';

function TableProductsCart() {
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice] = useCartTotalPrice();

  function handleClick(id) {
    const newCart = cart.filter((p) => p.productId !== id);

    setCart(newCart);
  }

  useEffect(() => {
    const cartLocalStorage = JSON.parse(localStorage.getItem('carrinho'));

    setCart(cartLocalStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container-table">
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
          { cart && cart.map((product, index) => (
            <tr key={ index }>
              <td
                className="table-item"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="table-name"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product.name }
              </td>
              <td
                className="table-quantity"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { product.quantity }
              </td>
              <td
                className="table-unit-price"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${parseFloat(product.unitPrice).toFixed(2)}`.replace('.', ',') }
              </td>
              <td
                className="table-subtotal"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${parseFloat(product.subTotal).toFixed(2)}`.replace('.', ',') }
              </td>
              <td className="table-remove-item">
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  onClick={ () => handleClick(product.productId) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>

      <h2
        className="total-price"
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total: R$ ${parseFloat(totalPrice).toFixed(2)}`.replace('.', ',') }
      </h2>
    </div>
  );
}

export default TableProductsCart;
