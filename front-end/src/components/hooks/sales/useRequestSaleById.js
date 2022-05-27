import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

function useRequestSaleById() {
  const [chanseStatus, setChangeStatus] = useState(false);
  const [sale, setSale] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get(`/seller/orders/${id}`, { headers: { Authorization: token } })
      .then(({ data }) => {
        setSale(data);
        setChangeStatus(false);
      }).catch((err) => console.log(err));
  }, [id, chanseStatus]);

  return [sale, setChangeStatus];
}

export default useRequestSaleById;
