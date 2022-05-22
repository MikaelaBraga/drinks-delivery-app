import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

function useRequestSaleById() {
  const [sale, setSale] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api.get(`/seller/orders${id}`).then(({ data }) => {
      setSale(data);
    }).catch((err) => console.log(err));
  }, [id]);

  return [sale];
}

export default useRequestSaleById;
