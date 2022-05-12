import { useEffect, useState } from 'react';

function GetSellers() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/customer/sellers', { headers: { Authorization: token } })
      .then((response) => {
        setSellers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [sellers];
}

export default GetSellers;
