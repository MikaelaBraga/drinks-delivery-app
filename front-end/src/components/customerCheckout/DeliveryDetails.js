import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../../services/api';
import useGetSellers from '../hooks/checkout/useGetSellers';
import deliveryDetailsValidate from './validate/deliveryDetailsValidate';

function DeliveryDetails() {
  const [sellers] = useGetSellers();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(deliveryDetailsValidate),
    mode: 'onChange',
  });

  // const { token } = JSON.parse(localStorage.getItem('user'));

  // function sendOrders(datas) {
  // const { adress, numberAdress, seller } = datas;
  // const order = { products: [] };

  // api.post('/customer/order', datas,
  //   { headers: { Authorization: token } }).then().catch();
  // }

  // {
  //   "products": [
  //     {
  //       "productId": 0,
  //       "quantity": 0
  //     }
  //   ],
  //   "sellerId": 0,
  //   "totalPrice": 0,
  //   "deliveryAddress": "string",
  //   "deliveryNumber": 0
  // }

  const onSubmit = (datas) => console.log(datas);

  return (
    <>
      <h1>Detalhes e Endereço para Entrega</h1>

      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="seller"
            { ...register('seller') }
          >
            <option value="" selected disabled hidden>Escolha um vendedor...</option>
            { sellers.map((seller, index) => (
              <option key={ index } value={ seller.name }>{ seller.name }</option>
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

        <strong>
          { errors.seller?.message
          || errors.adress?.message
          || errors.numberAdress?.message }
        </strong>

        <button type="submit">FINALIZAR PEDIDO</button>
      </form>
    </>
  );
}

export default DeliveryDetails;
