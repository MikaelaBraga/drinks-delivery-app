import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function TableOrderDetails() {
  const [orders, setOrders] = useState([]);
  const [statusOrder, setStatusOrder] = useState('');

  const { saleId } = JSON.parse(localStorage.getItem(('carrinho')));

  useEffect((data) => {
    api.post(`/customer/orders/${saleId}`, data)
      .then((response) => {
        setOrders(response.data);
        setStatusOrder(response.data.status);
      })
      .catch(({ response }) => console.log(response.data));
  }, [saleId]);

  function handleSubmit(data) {
    setStatusOrder('Entregue');
    api.put(`/customer/orders/${saleId}`, { data, ...statusOrder });
  }

  return (
    <div>
      { orders.map((o) => (
        <table key={ o.id }>
          <thead>
            <tr>
              <th>{`Pedido ${saleId}`}</th>
              <th>
                {`P.Vend: ${o.sellerId}`}
              </th>
              <th>{o.saleDate }</th>
              <th>{ statusOrder }</th>
              <button
                type="button"
                onSubmit={ handleSubmit }
              >
                Marcar como entregue
              </button>
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
            {
              orders.products.map((op, i) => (
                <tr key={ i }>
                  <td>{ i + 1 }</td>
                  <td>{ op.name }</td>
                  <td>{}</td>
                  <td>{ op.price }</td>
                  <td>{ o.totalPrice }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default TableOrderDetails;
