import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="container">
      <ul className="ul-container">
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
        <li data-testid="customer_products__element-navbar-user-full-name">
          nome
        </li>
        <li>
          <Link to="/"> Sair </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
