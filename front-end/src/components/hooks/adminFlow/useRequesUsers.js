import { useEffect, useState } from 'react';
import api from '../../../services/api';

function useRequestUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/user', { headers: { Authorization: token } }).then(({ data }) => {
      setUsers(data);
    }).catch((err) => console.log(err));
  }, []);

  return [users, setUsers];
}

export default useRequestUsers;
