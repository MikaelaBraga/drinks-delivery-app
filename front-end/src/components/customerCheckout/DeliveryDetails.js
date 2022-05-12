import React from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../../services/api';
// import GetCheckout from '../hooks/checkout/GetCheckout';
import GetSellers from '../hooks/checkout/GetSellers';

function DeliveryDetails() {
  // const { token } = JSON.parse(localStorage.getItem('user'));
  // const [cartCheckout] = GetCheckout();
  const [sellers] = GetSellers();
  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(loginValidate),
    mode: 'onChange',
  });

  // function sendOrders(datas) {
  //   console.log(datas);
  // const { adress, number } = datas;
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

        <button type="submit">FINALIZAR PEDIDO</button>
      </form>
    </>
  );
}

export default DeliveryDetails;
