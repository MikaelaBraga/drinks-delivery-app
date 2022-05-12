import { useEffect, useState } from 'react';

function CartTotalPrice() {
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = JSON.parse(localStorage.getItem('carrinho'));

  useEffect(() => {
    const newPrice = cart.reduce((acc, crr) => {
      acc += crr.subTotal;
      return acc;
    }, 0);
    setTotalPrice(newPrice);
  }, [cart]);

  return [totalPrice];
}

export default CartTotalPrice;
