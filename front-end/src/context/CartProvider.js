import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cart));
  }, [cart]);

  function handleChangeItem({ target }, price) {
    const { id, value, name } = target;

    const newCart = [...cart];
    const product = newCart.find((p) => p.productId === id);

    if (!product) {
      newCart.push({
        productId: Number(id),
        name,
        quantity: Number(value),
        unitPrice: Number(price),
        subTotal: Number(price) * Number(value) });
    }

    setCart(newCart);
  }

  function addCheckoutItem(id, title, price) {
    const newCart = [...cart];

    const product = newCart.find((p) => p.productId === id);

    if (!product) {
      newCart.push({
        productId: id,
        name: title,
        quantity: 1,
        unitPrice: Number(price),
        subTotal: Number(price) });
    } else {
      product.quantity += 1;
      product.subTotal = product.unitPrice * product.quantity;
    }
    setCart(newCart);
  }

  function removeCheckoutItem(id) {
    const newCart = [...cart];

    const product = newCart.find((p) => p.productId === id);

    if (product && product.quantity > 1) {
      product.quantity -= 1;
      product.subTotal = product.unitPrice * product.quantity;
      setCart(newCart);
    } else {
      const arrayFiltered = newCart.filter((p) => p.productId !== id);
      setCart(arrayFiltered);
    }
  }

  const contextValue = {
    cart,
    setCart,
    addCheckoutItem,
    removeCheckoutItem,
    handleChangeItem,
  };

  return (
    <CartContext.Provider value={ contextValue }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
