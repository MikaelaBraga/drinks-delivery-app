import PropTypes from 'prop-types';
import React from 'react';

function SaleCardSeller(props) {
  const { sale, index } = props;
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  return (
    <div className="saleCard" key={ index }>
      <div data-testid={ `seller_orders__element-order-id-${id}` }>
        <h1>Pedido</h1>
        <h2>{id}</h2>
      </div>
      <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
        <h1>{status}</h1>
      </div>
      <div data-testid={ `seller_orders__element-order-date-${id}` }>
        <h1>{saleDate}</h1>
      </div>
      <div data-testid={ `seller_orders__element-card-price-${id}` }>
        <h1>{totalPrice}</h1>
      </div>
      <div data-testid={ `seller_orders__element-card-address-${id}` }>
        <h3>{ `${deliveryAddress}, ${deliveryNumber}`}</h3>
      </div>
    </div>
  );
}

SaleCardSeller.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default SaleCardSeller;
