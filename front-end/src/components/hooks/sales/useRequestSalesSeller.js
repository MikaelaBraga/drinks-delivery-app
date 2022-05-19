import { useEffect, useState } from 'react';
import api from '../../../services/api';

function useRequestSalesSeller() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/seller/orders', { headers: { Authorization: token } })
      .then((response) => {
        setSales(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [sales];
}

export default useRequestSalesSeller;
