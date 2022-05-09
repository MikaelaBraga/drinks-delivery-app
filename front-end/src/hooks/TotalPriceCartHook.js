import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartProvider';

function CartTotalPrice() {
  const { setTotalPrice } = useContext(CartContext);
  const cart = JSON.parse(localStorage.getItem('carrinho'));

  useEffect(() => {
    const newPrice = cart.reduce((acc, crr) => {
      acc += crr.subtotal;
      return acc;
    }, 0);
    setTotalPrice(newPrice);
  }, [cart, setTotalPrice]);
}

export default CartTotalPrice;
