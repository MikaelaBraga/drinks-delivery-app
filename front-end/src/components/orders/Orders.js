import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './orders.css';

function Orders(props) {
  const [statusColor, setStatusColor] = useState('');
  const { order, index } = props;
  const { id, status, saleDate, totalPrice } = order;

  useEffect(() => {
    if (status === 'Pendente') setStatusColor('orange');
    if (status === 'Preparando') setStatusColor('yellow');
    if (status === 'Em trânsito') setStatusColor('green');
  }, [status]);

  const dateInput = saleDate;
  const newDate = new Date(dateInput);

  return (
    <Link
      to={ `/customer/orders/${id}` }
      key={ index }
      style={ { textDecoration: 'none', color: 'black' } }
    >
      <div className="order-card" key={ id }>
        <div className="order-number">
          <p
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            { `Pedido 00${index + 1}` }
          </p>
        </div>
        <div className="order-status" style={ { backgroundColor: statusColor } }>
          <h3
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            { status }
          </h3>
        </div>
        <div className="date-price">
          <h5
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            { newDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
          </h5>
          <h5
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            { `R$ ${totalPrice}`.replace('.', ',') }
          </h5>
        </div>
      </div>
    </Link>
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
