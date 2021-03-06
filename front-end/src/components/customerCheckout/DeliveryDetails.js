import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useGetSellers from '../hooks/checkout/useGetSellers';
import deliveryDetailsValidate from './validate/deliveryDetailsValidate';
import { CartContext } from '../../context/CartProvider';
import useCartTotalPrice from '../hooks/products/useTotalPrice';
import './customerCheckout.css';

function DeliveryDetails() {
  const [sellers] = useGetSellers();
  const { cart } = useContext(CartContext);
  const [totalPrice] = useCartTotalPrice();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
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

    const orders = {
      products: productsCart,
      sellerId: seller,
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
    <div className="container-form">
      <h1>Detalhes e Endereço para Entrega</h1>

      <form className="delivery-form" onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            className="select-seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
            { ...register('seller') }
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
        <label htmlFor="adress">
          Endereço
          <input
            className="input-adress"
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
            className="input-number"
            type="number"
            name="numberAdress"
            data-testid="customer_checkout__input-addressNumber"
            placeholder="198"
            { ...register('numberAdress') }
          />
        </label>

        <strong className="error-message">
          { errors.seller?.message
          || errors.adress?.message
          || errors.numberAdress?.message }
        </strong>

        <button
          className="end-button"
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          disabled={ !isDirty || !isValid }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default DeliveryDetails;
