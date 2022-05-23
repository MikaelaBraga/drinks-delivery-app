import { useEffect, useState } from 'react';
import api from '../../../services/api';

function useRequestOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/customer/orders', { headers: { Authorization: token } })
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [orders];
}

export default useRequestOrders;
