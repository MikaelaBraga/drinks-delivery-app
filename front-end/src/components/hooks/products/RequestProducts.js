import { useEffect, useState } from 'react';
import api from '../../../services/api';

function RequestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/customer/products', { headers: { Authorization: token } })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [products];
}

export default RequestProducts;
