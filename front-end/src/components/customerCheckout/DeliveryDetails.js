import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import GetCheckout from '../hooks/checkout/GetCheckout';
import GetSellers from '../hooks/checkout/GetSellers';

function DeliveryDetails() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [cartCheckout] = GetCheckout();
  const [sellers] = GetSellers();

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(loginValidate),
    mode: 'onChange',
  });

  function sendOrders(datas) {
    const { adress, number } = datas;
    const order = { products: [] };

    api.post('/customer/order', datas,
      { headers: { Authorization: token } }).then().catch();
  }

  const onSubmit = (datas) => sendOrders(datas);

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <label htmlFor="seller">
        P. Vendedora Responsável:
        <select name="seller">
          { sellers.map((seller, index) => (
            <option key={ index }>{ seller.name }</option>
          )) }
        </select>
      </label>
      <label htmlFor="adress">
        Endereço
        <input
          type="text"
          name="adress"
          placeholder="Rua Xablau, Bairro Xablauzinho"
          { ...register('adress') }
        />
      </label>
      <label htmlFor="numberAdress">
        Número
        <input
          type="number"
          name="numberAdress"
          placeholder="198"
          { ...register('numberAdress') }
        />
      </label>

      <strong>{ errors.adress?.message || errors.numberAdress?.message }</strong>

      <button type="submit" disabled={ !isDirty || !isValid }>FINALIZAR PEDIDO</button>
    </form>
  );
}

export default DeliveryDetails;
