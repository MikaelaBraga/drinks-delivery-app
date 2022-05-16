import React, { useContext, useState } from 'react';
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
  const [sellerState, setSellerState] = useState(2);
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

    const { adress, numberAdress } = datas;
    // const idSeller = sellers.find(({ name }) => name === sellerState)?.id;

    const orders = {
      products: productsCart,
      sellerId: sellerState,
      totalPrice,
      deliveryAddress: adress,
      deliveryNumber: numberAdress,
    };

    api.post('/customer/order', orders,
      { headers: { Authorization: token } })
      .then(({ data }) => {
        navigate(`/customer/orders/${data.saleId}`);
      })
      .catch(({ response }) => console.log(response));
  }

  const onSubmit = (datas) => sendOrders(datas);

  return (
    <>
      <h1>Detalhes e Endereço para Entrega</h1>

      <label htmlFor="seller">
        P. Vendedora Responsável:
        <select
          name="seller"
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target }) => setSellerState(target.value) }
          value={ sellerState }
        >
          {
            sellers.map((seller, index) => (
              <option
                key={ index }
                value={ seller.id }
              >
                { seller.name }
              </option>
            ))
          }
        </select>
      </label>

      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="adress">
          Endereço
          <input
            type="text"
            name="adress"
            data-testid="customer_checkout__input-address"
            placeholder="Rua Xablau, Bairro Xablauzinho"
            { ...register('adress') }
          />
        </label>
        <label htmlFor="numberAdress">
          Número
          <input
            type="number"
            name="numberAdress"
            data-testid="customer_checkout__input-addressNumber"
            placeholder="198"
            { ...register('numberAdress') }
          />
        </label>

        <strong>
          { errors.seller?.message
          || errors.adress?.message
          || errors.numberAdress?.message }
        </strong>

        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </>
  );
}

export default DeliveryDetails;
