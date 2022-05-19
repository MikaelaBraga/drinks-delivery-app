import React from 'react';
import RegisterUserFormAdmin from '../components/adminFlow/RegisterUserForm';
import UserList from '../components/adminFlow/UserList';
import Navbar from '../components/navBar/navBar';
import AdminProvider from '../context/AdminProvider';

function AdminPage() {
  return (
    <>
      <Navbar />
      <AdminProvider>
        <RegisterUserFormAdmin />
        <UserList />
      </AdminProvider>
    </>
  );
}

export default AdminPage;
