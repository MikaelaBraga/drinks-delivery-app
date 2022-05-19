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
            <td data-testid="admin_manage__element-user-table-item-number-">1</td>
            <td data-testid="admin_manage__element-user-table-name-">Fulana Pereira</td>
            <td
              data-testid="admin_manage__element-user-table-email-"
            >
              fulana@deliveryapp.com
            </td>
            <td data-testid="admin_manage__element-user-table-role-">P. Vendedora</td>
            <td>
              {/* <button
                type="button"
                data-testid="admin_manage__element-user-table-remove-"
              >
                Excluir
              </button> */}
            </td>
          </tr>
        </tbody>
      </table>
    </>

  );
}

export default UserList;
