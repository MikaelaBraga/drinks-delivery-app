import { useEffect } from 'react';

function GetCartCheckout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getLocalStorageCart = JSON.parse(localStorage.getItem('carrinho'));

    setCart(getLocalStorageCart);
  }, [cart]);

  return [cart];
}

export default GetCartCheckout;
