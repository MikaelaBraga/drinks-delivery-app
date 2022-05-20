import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useRequestUsers from '../components/hooks/adminFlow/useRequesUsers';

export const AdminContext = createContext();

function AdminProvider({ children }) {
  const [users, setUsers] = useRequestUsers();

  function addNewUser(datas) {
    const { id, name, email, role } = datas;
    const newUsers = [...users];

    newUsers.push({ id, name, email, role });

    setUsers(newUsers);
  }
  const contextValue = { addNewUser, users, setUsers };

  return (
    <AdminContext.Provider value={ contextValue }>
      { children }
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProvider;
