import React from 'react';
import RegisterUserFormAdmin from '../components/adminFlow/RegisterUserForm';
import Navbar from '../components/navBar/navBar';

function AdminPage() {
  return (
    <>
      <Navbar />
      <RegisterUserFormAdmin />
    </>
  );
}

export default AdminPage;
