import React from 'react';
import SaleCardSeller from '../components/sale/saleCardSeller';
import RequestSalesSeller from '../components/hooks/sales/RequestSalesSeller';
import Navbar from '../components/navBar/navBar';

function SellerOrders() {
  const [sales] = RequestSalesSeller();

  return (
    <div>
      <Navbar />
      <div className="sales">
        { sales.map((sale, index) => (
          <SaleCardSeller sale={ sale } index={ index } key={ index } />
        ))}
      </div>
    </div>
  );
}

export default SellerOrders;
