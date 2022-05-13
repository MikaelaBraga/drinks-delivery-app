import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartProvider';

function useCartTotalPrice() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const newPrice = cart.reduce((acc, crr) => {
      acc += crr.subTotal;
      return acc;
    }, 0);
    setTotalPrice(newPrice);
  }, [cart]);

  return [totalPrice];
}

export default useCartTotalPrice;
