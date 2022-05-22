import React from 'react';
import PropTypes from 'prop-types';
import useRequestSaleById from '../hooks/sales/useRequestSaleById';

function SaleDetail() {
  const [sale] = useRequestSaleById();
  const { products } = sale;
  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      
    </div>
  );
}

SaleDetail.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
  }).isRequired,
};

export default SaleDetail;
