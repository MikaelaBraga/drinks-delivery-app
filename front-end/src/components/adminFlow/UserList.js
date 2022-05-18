import React from 'react';

function UserList() {
  return (
    <>
      <h1>Lista de usuários</h1>

      <table>
        <thead>
          <tr>Item</tr>
          <tr>Nome</tr>
          <tr>Email</tr>
          <tr>Tipo</tr>
          <tr>Excluir</tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Fulana Pereira</td>
            <td>fuana@deliveryapp.com</td>
            <td>P. Vendedora</td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>

  );
}

export default UserList;
