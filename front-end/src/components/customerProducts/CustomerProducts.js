import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { CartContext } from '../../context/CartProvider';

function ProductCard() {
  const [products, setProducts] = useState([]);
  const { addCheckoutItem, removeCheckoutItem, cart = [] } = useContext(CartContext);
  console.log(cart);

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
            { `R$${product.price}` }
          </h5>
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ () => addCheckoutItem(product.id, product.name, product.price) }
          >
            +
          </button>
          <p
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
          >
            { cart.find((c) => c.item === product.id)
              ? cart.find((c) => c.item === product.id)?.quantity : 0 }
          </p>
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
        <button
          data-testid="customer_products__checkout-bottom-value"
          type="button"
        >
          Ver carrinho: preço dinâmico
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
