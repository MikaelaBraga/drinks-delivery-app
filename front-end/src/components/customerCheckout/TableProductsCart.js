import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartProvider';
import useCartTotalPrice from '../hooks/products/useTotalPrice';

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
          { cart && cart.map((product, index) => (
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
          )) }
        </tbody>
      </table>

      <h2
        data-testid="customer_checkout__element-order-total-price"
      >
        { `${parseFloat(totalPrice).toFixed(2)}`.replace('.', ',') }
      </h2>
    </div>
  );
}

export default TableProductsCart;
