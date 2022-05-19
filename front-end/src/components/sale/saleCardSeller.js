import PropTypes from 'prop-types';
import React from 'react';

function SaleCardSeller(props) {
  const { sale, index } = props;
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  return (
    <div className="saleCard" key={ index }>
      <div data-testid={ `seller_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        <span>{id}</span>
      </div>
      <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
        <h2>{status}</h2>
      </div>
      <div data-testid={ `seller_orders__element-order-date-${id}` }>
        <h3>{saleDate}</h3>
      </div>
      <div data-testid={ `seller_orders__element-card-price-${id}` }>
        <h2>{`${totalPrice}`.replace('.', ',')}</h2>
      </div>
      <div data-testid={ `seller_orders__element-card-address-${id}` }>
        <p>{ `${deliveryAddress}, ${deliveryNumber}`}</p>
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
