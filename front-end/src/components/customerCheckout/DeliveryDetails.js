import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useGetSellers from '../hooks/checkout/useGetSellers';
import deliveryDetailsValidate from './validate/deliveryDetailsValidate';
import { CartContext } from '../../context/CartProvider';
import useCartTotalPrice from '../hooks/products/useTotalPrice';

function DeliveryDetails() {
  const [sellers] = useGetSellers();
  const { cart } = useContext(CartContext);
  const [totalPrice] = useCartTotalPrice();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(deliveryDetailsValidate),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  function sendOrders(datas) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const productsCart = cart.map(({ productId, quantity }) => {
      const newObj = { productId, quantity };
      return newObj;
    });

    const { adress, numberAdress, seller } = datas;
    const idSeller = sellers.find(({ name }) => name === seller)?.id;

    const orders = {
      products: productsCart,
      sellerId: idSeller,
      totalPrice,
      deliveryAddress: adress,
      deliveryNumber: numberAdress,
    };

    api.post('/customer/order', orders,
      { headers: { Authorization: token } })
      .then(() => navigate('/customer/finished'))
      .catch(({ response }) => console.log(response));
  }

  const onSubmit = (datas) => sendOrders(datas);

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
