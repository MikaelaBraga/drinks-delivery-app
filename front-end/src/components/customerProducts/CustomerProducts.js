import React, { useContext } from 'react';
import './productsPage.css';

import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartProvider';
import useCartTotalPrice from '../hooks/products/useTotalPrice';
import useRequestProducts from '../hooks/products/useRequesProducts';

function ProductCard() {
  const [products] = useRequestProducts();
  const [totalPrice] = useCartTotalPrice();
  const {
    addCheckoutItem,
    removeCheckoutItem,
    cart = [], handleChangeItem } = useContext(CartContext);

  return (
    <div>
      <div className="products">
        { products.map((product, index) => (
          <div className="card" key={ index }>
            <div className="image">
              <img
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt="imagem do produto"
              />
            </div>
            <h3
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              { product.name }
            </h3>
            <h5
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              { `R$ ${product.price}`.replace('.', ',') }
            </h5>
            <div className="counter-product">
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                onClick={ () => addCheckoutItem(product.id, product.name, product.price) }
              >
                +
              </button>
              <input
                type="text"
                id={ product.id }
                name={ product.name }
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                onChange={ (e) => handleChangeItem(e, product.price) }
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
          </div>
        )) }
      </div>
      <Link to="/customer/checkout">
        <button
          className="cart-button"
          data-testid="customer_products__button-cart"
          type="button"
          disabled={ totalPrice === 0 }
        >
          <span data-testid="customer_products__checkout-bottom-value">
            {`Carrinho: R$ ${parseFloat(totalPrice).toFixed(2)}`.replace('.', ',')}
          </span>
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
