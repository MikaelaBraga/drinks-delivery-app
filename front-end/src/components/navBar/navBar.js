import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navBar.module.css';

function Navbar() {
  return (
    <nav className={ styles.navBar }>
      <ul className={ styles.list }>
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
        <li
          className={ styles.item }
          data-testid="customer_products__element-navbar-user-full-name"
        >
          nome
        </li>
        <li className={ styles.item }>
          <Link to="/"> Sair </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
