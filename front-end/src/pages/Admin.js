import React from 'react';
import RegisterUserFormAdmin from '../components/adminFlow/RegisterUserForm';
import UserList from '../components/adminFlow/UserList';
import Navbar from '../components/navBar/navBar';

function AdminPage() {
  return (
    <>
      <Navbar />
      <RegisterUserFormAdmin />
      <UserList />
    </>
  );
}

export default AdminPage;
