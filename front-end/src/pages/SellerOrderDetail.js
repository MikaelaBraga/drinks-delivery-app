import React from 'react';
import Navbar from '../components/navBar/navBar';
import SaleDetail from '../components/sale/SaleSellerDetail';
import useRequestSalesSeller from '../components/hooks/sales/useRequestSalesSeller';

function SellerOrderDetail() {
  const [sales] = useRequestSalesSeller();
  return (
    <>
      <Navbar />
      <div>
        { sales.map((sale, index) => (
          <SaleDetail sale={ sale } key={ index } />
        )) }
      </div>
    </>
  );
}

export default SellerOrderDetail;
