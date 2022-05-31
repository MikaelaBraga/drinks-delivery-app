import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminProvider';
import api from '../../services/api';
import './adminUserList.css';

function UserList() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { users, setUsers } = useContext(AdminContext);

  function handleClick(id) {
    api.delete(`admin/user/${id}`, { headers: { Authorization: token } })
      .then(() => {
        const newUsers = users.filter((p) => p.id !== id);

        setUsers(newUsers);
      }).catch((err) => console.log(err));
  }

  useEffect(() => {}, [users]);

  return (
    <div className="container-user-table">
      <h1>Lista de usuários</h1>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { users.length > 0 && users.map((user, index) => (
            <tr key={ index }>
              <td
                className="admin-table-item"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                { index + 1 }
              </td>
              <td
                className="admin-table-name"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { user.name }
              </td>
              <td
                className="admin-table-email"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                { user.email }
              </td>
              <td
                className="admin-table-typeUser"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                { user.role }
              </td>
              <td className="admin-table-removeUser">
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => handleClick(user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default UserList;
