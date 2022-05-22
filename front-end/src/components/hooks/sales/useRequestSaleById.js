import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

function useRequestSaleById() {
  const [sale, setSale] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get(`/seller/orders${id}`, { headers: { Authorization: token } })
      .then(({ data }) => {
        setSale(data);
      }).catch((err) => console.log(err));
  }, [id]);

  return [sale];
}

export default useRequestSaleById;
