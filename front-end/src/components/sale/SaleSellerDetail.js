import React from 'react';
import useRequestSaleById from '../hooks/sales/useRequestSaleById';

function SaleDetail() {
  const [sale] = useRequestSaleById();
  const { products } = sale;
  const ten = 10;

  const dateInput = sale.saleDate?.substring(0, ten);
  const newDate = new Date(dateInput);
  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      <table>
        <thead>
          <tr>
            <th>Pedido 001</th>
            <th>{ newDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }</th>
            <th>{ sale?.status }</th>
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
          { products && products.map((p, index) => (
            <tr key={ index }>
              <td>{ index + 1 }</td>
              <td>{ p.name }</td>
              <td>{ p.quantity.quantity }</td>
              <td>{ p.price }</td>
              <td>{ ((p.quantity.quantity) * (p.price)).toFixed(2) }</td>
            </tr>
          )) }
        </tbody>
      </table>
      <strong>{ `${sale.totalPrice}`.replace('.', ',') }</strong>
    </div>
  );
}

export default SaleDetail;
