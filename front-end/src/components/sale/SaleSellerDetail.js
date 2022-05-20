import React from 'react';
import { useParams } from 'react-router-dom';
import useRequestSalesSeller from '../hooks/sales/useRequestSalesSeller';

function SaleDetail() {
  const [sales] = useRequestSalesSeller();
  const { id } = useParams();
  return (
    <div>
      
    </div>
  );
}

export default SaleDetail;
