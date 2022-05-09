import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { CartContext } from '../../context/CartProvider';

function ProductCard() {
  const [products, setProducts] = useState([]);
  const { addCheckoutItem,
    removeCheckoutItem, totalPrice, cart = [] } = useContext(CartContext);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/customer/products', { headers: { Authorization: token } })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      { products.map((product, index) => (
        <div key={ index }>
          <h3
            data-testid={ `customer_products__element-card-title-${product.id}` }
          >
            { product.name }
          </h3>
          <img
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt="imagem do produto"
          />
          <h5
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            { `${product.price}`.replace('.', ',') }
          </h5>
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ () => addCheckoutItem(product.id, product.name, product.price) }
          >
            +
          </button>
          <input
            type="number"
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            value={ cart.find((c) => c.productId === product.id)
              ? cart.find((c) => c.productId === product.id)?.quantity : 0 }
          />
          <button
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            type="button"
            onClick={ () => removeCheckoutItem(product.id) }
          >
            -
          </button>
        </div>
      )) }

      <div>
        <Link to="/customer/checkout">
          <button
            data-testid="customer_products__checkout-bottom-value"
            type="button"
          >
            {`${parseFloat(totalPrice).toFixed(2)}`.replace('.', ',')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
