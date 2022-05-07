import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  // const [totalPrice, setTotalPrice] = useState();

  function addCheckoutItem(id, name, price) {
    const newCart = [...cart];

    const product = newCart.find((p) => p.item === id);

    if (!product) {
      newCart.push({ item: id, description: name, quantity: 1, price, subtotal: price });
    } else {
      product.quantity += 1;
      product.subtotal = product.price * product.quantity;
    }

    setCart(newCart);
  }

  function removeCheckoutItem(id) {
    const newCart = [...cart];

    const product = newCart.find((p) => p.item === id);

    if (product && product.quantity > 1) {
      product.quantity -= 1;
      product.subtotal = product.price * product.quantity;
      setCart(newCart);
    } else {
      const arrayFiltered = newCart.filter((p) => p.item !== id);
      setCart(arrayFiltered);
    }
  }

  const contextValue = {
    cart,
    setCart,
    addCheckoutItem,
    removeCheckoutItem,
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
