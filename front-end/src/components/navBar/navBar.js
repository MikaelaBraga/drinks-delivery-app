import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navBar.module.css';

function Navbar() {
  const [isUser, setIsUser] = useState('');
  const [isSeller, setIsSeller] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const { name, role } = JSON.parse(localStorage.getItem(('data')));

  useEffect(() => {
    switch (role) {
    case 'customer':
      setIsUser(true);
      break;
    case 'seller':
      setIsSeller(true);
      break;
    case 'administrator':
      setIsAdmin(true);
      break;
    default:
      break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navBarUser() {
    return (
      <>
        <li className={ styles.item }>
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </Link>
        </li>
        <li className={ styles.item }>
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            Meus pedidos
          </Link>
        </li>
      </>
    );
  }

  function navBarSeller() {
    return (
      <li className={ styles.item }>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Pedidos
        </Link>
      </li>
    );
  }

  function navBarAdmin() {
    return (
      <li className={ styles.item }>
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/admin/manage"
        >
          Gerenciar Usuários
        </Link>
      </li>
    );
  }

  return (
    <nav className={ styles.navBar }>
      <ul className={ styles.list }>
        { isUser && navBarUser() }
        { isSeller && navBarSeller() }
        { isAdmin && navBarAdmin() }
        <li
          className={ styles.item }
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </li>
        <li
          className={ styles.item }
          data-testid="customer_products__element-navbar-link-logout"
        >
          <Link to="/"> Sair </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
