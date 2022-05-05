import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <ul>
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
        <li>
          <p data-testid="customer_products__element-navbar-user-full-name">
            nome
          </p>
        </li>
        <li>
          <Link to="/"> Sair </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
