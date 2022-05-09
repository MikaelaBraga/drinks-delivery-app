import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  localStorage.setItem('carrinho', JSON.stringify(cart));

  function addCheckoutItem(id, title, price) {
    const newCart = [...cart];

    const product = newCart.find((p) => p.productId === id);

    if (!product) {
      newCart.push({
        productId: id,
        name: title,
        quantity: 1,
        unitPrice: price,
        subTotal: Number(price) });
    } else {
      product.quantity += 1;
      product.subTotal = product.unitPrice * product.quantity;
    }
    setCart(newCart);

    const newPrice = newCart.reduce((acc, crr) => {
      acc += crr.subTotal;
      return acc;
    }, 0);
    setTotalPrice(newPrice);
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

    const newPrice = newCart.reduce((acc, crr) => {
      acc += crr.subTotal;
      return acc;
    }, 0);
    setTotalPrice(newPrice);
  }

  const contextValue = {
    cart,
    setCart,
    addCheckoutItem,
    removeCheckoutItem,
    totalPrice,
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
