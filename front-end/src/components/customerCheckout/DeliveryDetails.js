import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../../services/api';
// import GetCheckout from '../hooks/checkout/GetCheckout';
import GetSellers from '../hooks/checkout/GetSellers';

function DeliveryDetails() {
  // const { token } = JSON.parse(localStorage.getItem('user'));
  // const [cartCheckout] = GetCheckout();
  const [sellers] = GetSellers();
  console.log(sellers);

  // function sendOrders(datas) {
  //   console.log(datas);
  // const { adress, number } = datas;
  // const order = { products: [] };

  // api.post('/customer/order', datas,
  //   { headers: { Authorization: token } }).then().catch();
  // }

  return (
    <>
      <h1>Detalhes e Endereço para Entrega</h1>

      <form>
        <select name="seller">
          P. Vendedora Responsável:
          { sellers.map((seller, index) => (
            <option key={ index } value={ seller.name }>{ seller.name }</option>
          )) }
        </select>

        <label htmlFor="adress">
          Endereço
          <input
            type="text"
            name="adress"
            placeholder="Rua Xablau, Bairro Xablauzinho"
          />
        </label>
        <label htmlFor="numberAdress">
          Número
          <input
            type="number"
            name="numberAdress"
            placeholder="198"
          />
        </label>

        <button type="button">FINALIZAR PEDIDO</button>
      </form>
    </>
  );
}

export default DeliveryDetails;
