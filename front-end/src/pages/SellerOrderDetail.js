import React from 'react';
import Navbar from '../components/navBar/navBar';
import SaleDetail from '../components/sale/SaleSellerDetail';

function SellerOrderDetail() {
  return (
    <div className="sale-detail">
      <Navbar />
      <SaleDetail />
    </div>
  );
}

export default SellerOrderDetail;
