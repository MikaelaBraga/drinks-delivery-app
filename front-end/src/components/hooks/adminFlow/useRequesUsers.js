import { useEffect, useState } from 'react';
import api from '../../../services/api';

function useRequestUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/user').then(({ data }) => {
      setUsers(data);
    }).catch((err) => console.log(err));
  }, []);

  return [users];
}

export default useRequestUsers;
