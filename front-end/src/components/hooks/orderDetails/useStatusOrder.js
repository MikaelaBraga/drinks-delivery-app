import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

function useStatusOrder() {
  const [changeStatus, setChangeStatus] = useState(false);
  const { id } = useParams();

  const { token } = JSON.parse(localStorage.getItem(('user')));

  useEffect(() => {
    if (changeStatus) {
      const updateStatus = { status: 'Entregue' };
      api.put(`/customer/orders/${id}`, updateStatus, {
        headers: { Authorization: token } });
    }
  }, [changeStatus, id, token]);

  return [setChangeStatus, changeStatus];
}

export default useStatusOrder;
