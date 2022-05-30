import React from 'react';
import SaleCardSeller from '../components/sale/saleCardSeller';
import useRequestSalesSeller from '../components/hooks/sales/useRequestSalesSeller';
import Navbar from '../components/navBar/navBar';

function SellerOrders() {
  const [sales] = useRequestSalesSeller();

  return (
    <>
      <Navbar />
      <div className="sales">
        { sales && sales.map((sale, index) => (
          <SaleCardSeller sale={ sale } index={ index } key={ index } />
        ))}
      </div>
    </>
  );
}

export default SellerOrders;
