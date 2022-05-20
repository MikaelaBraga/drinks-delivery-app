import PropTypes from 'prop-types';
import React from 'react';
import './saleCard.css';

function SaleCardSeller(props) {
  const { sale, index } = props;
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  return (
    <div className="saleCard" key={ index }>
      <div
        className="orderId"
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        <p>Pedido</p>
        <span>{id}</span>
      </div>
      <div
        className="statusCard"
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        <h2>{status}</h2>
      </div>
      <div
        className="saleInformation"
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        <strong>{saleDate}</strong>
        <strong
          data-testid={ `seller_orders__element-card-price-${id}` }
        >
          {`${totalPrice}`.replace('.', ',')}
        </strong>
        <p
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          { `${deliveryAddress}, ${deliveryNumber}`}
        </p>
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
