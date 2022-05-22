import React from 'react';
import useRequestSaleById from '../hooks/sales/useRequestSaleById';

function SaleDetail() {
  const [sale] = useRequestSaleById();
  const { products } = sale;
  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      <table>
        <thead>
          <tr>
            <th>Pedido 001</th>
            <th>22/05/2022</th>
            <th>Status Pendente</th>
            <th><button type="button">Preparar Pedido</button></th>
            <th><button type="button">Saiu para entrega</button></th>
          </tr>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {}
        </tbody>
      </table>
    </div>
  );
}

export default SaleDetail;
