import React from 'react';
import { Link } from 'react-router-dom';
import useCheckRole from '../hooks/navBar/checkRole';
import deliveryDrinksLogo from '../../images/drinksDelivery.png';
import './navBar.module.css';

function Navbar() {
  const [isUser, isSeller, isAdmin] = useCheckRole();
  const { name } = JSON.parse(localStorage.getItem(('user')));

  function navBarUser() {
    return (
      <>
        <li>
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </Link>
        </li>
        <li>
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
      <li>
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
      <li>
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
    <nav>
      <img src={ deliveryDrinksLogo } alt="logo delivery drinks" />

      <ul>
        { isUser && navBarUser() }
        { isSeller && navBarSeller() }
        { isAdmin && navBarAdmin() }
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </li>
      </ul>
      <Link to="/">
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;
