import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Orders(props) {
  const { order, index } = props;
  const { id, status, saleDate, totalPrice } = order;

  const dateInput = saleDate;
  const newDate = new Date(dateInput);

  return (
    <div>
      <Link
        to={ `/customer/orders/${id}` }
        key={ index }
        style={ { textDecoration: 'none', color: 'black' } }
      >
        <div key={ id }>
          <p
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            { `Pedido 00${index + 1}` }
          </p>
          <h3
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            { status }
          </h3>
          <h5
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            { newDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
          </h5>
          <h5
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            { `${totalPrice}`.replace('.', ',') }
          </h5>
        </div>
      </Link>

    </div>
  );
}

Orders.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Orders;
