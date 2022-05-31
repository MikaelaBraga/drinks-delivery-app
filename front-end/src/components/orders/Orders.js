import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './orders.css';

function Orders(props) {
  const [statusColor, setStatusColor] = useState('');
  const { order, index } = props;
  const { id, status, saleDate, totalPrice } = order;

  useEffect(() => {
    switch (status) {
    case 'Pendente':
      setStatusColor('orange');
      break;
    case 'Preparando':
      setStatusColor('yellow');
      break;
    case 'Em Trânsito':
      setStatusColor('#2da0ec');
      break;
    case 'Entregue':
      setStatusColor('#3bb54a');
      break;
    default:
      break;
    }
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
        <div
          className="order-number"
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          <p>Pedido</p>
          <span>{ `00${index + 1}` }</span>
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
