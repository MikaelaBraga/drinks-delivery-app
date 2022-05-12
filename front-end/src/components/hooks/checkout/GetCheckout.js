import { useState, useEffect } from 'react';

function GetCheckout() {
  const [cartCheckout, setCartCheckout] = useState([]);
  const cart = JSON.parse(localStorage.getItem('carrinho'));

  useEffect(() => {
    setCartCheckout(cart);
  }, [cart, cartCheckout]);

  return [cartCheckout, setCartCheckout];
}

export default GetCheckout;
