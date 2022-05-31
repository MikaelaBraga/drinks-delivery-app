import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './saleCard.css';

function SaleCardSeller(props) {
  const [statusColor, setStatusColor] = useState('');
  const { sale, index } = props;
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;

  useEffect(() => {
    switch (status) {
    case 'Pendente':
      setStatusColor('orange');
      break;
    case 'Preparando':
      setStatusColor('#e4c70b');
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
      to={ `/seller/orders/${id}` }
      style={ { textDecoration: 'none', color: 'black' } }
    >
      <div className="saleCard" key={ index }>
        <div
          className="orderId"
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          <p>Pedido</p>
          <span>{ `00${id}` }</span>
        </div>
        <div
          className="statusCard"
          data-testid={ `seller_orders__element-delivery-status-${id}` }
          style={ { backgroundColor: statusColor } }
        >
          <h3>{status}</h3>
        </div>
        <div
          className="saleInformation"
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          <p>
            { newDate
              .toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
          </p>
          <p
            data-testid={ `seller_orders__element-card-price-${id}` }
          >
            {`R$ ${totalPrice}`.replace('.', ',')}
          </p>
          <p
            data-testid={ `seller_orders__element-card-address-${id}` }
          >
            { `${deliveryAddress}, ${deliveryNumber}`}
          </p>
        </div>
      </div>
    </Link>
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
