import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './saleCard.css';

function SaleCardSeller(props) {
  const [statusColor, setStatusColor] = useState('');
  const { sale, index } = props;
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;

  useEffect(() => {
    if (status === 'Pendente') setStatusColor('orange');
    if (status === 'Preparando') setStatusColor('yellow');
    if (status === 'Em trânsito') setStatusColor('green');
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
