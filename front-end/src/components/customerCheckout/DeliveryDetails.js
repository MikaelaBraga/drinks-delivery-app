import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import GetCheckout from '../hooks/checkout/GetCheckout';

function DeliveryDetails() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [cartCheckout] = GetCheckout();
  const { register, handleSubmit } = useForm();

  function sendOrders(datas) {
    const { adress, number } = datas;
    const order = { products: [],  }

    api.post('/customer/order', datas,
    { headers: { Authorization: token } }).then().catch();
  }

  const onSubmit = (datas) => sendOrders(datas);

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <label>P. Vendedora Responsável:
        <select>
          <option>{}</option>
        </select>
      </label>
      <label>Endereço
        <input type="text" />
      </label>
      <label>Número
        <input type="number" />
      </label>
    </form>
  );
}

export default DeliveryDetails;
