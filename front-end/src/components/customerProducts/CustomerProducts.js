import React from 'react';
import ProductCounterButtons from './ProductCounterButtons';
// import api from '../../services/api';

const mockProducts = [{
  id: 1,
  name: 'Skol Lata 250ml',
  price: 2.20,
  url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
},
{
  id: 2,
  name: 'Heineken 600ml',
  price: 7.50,
  url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
},
{
  id: 3,
  name: 'Antarctica Pilsen 300ml',
  price: 2.49,
  url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
},
{
  id: 4,
  name: 'Brahma 600ml',
  price: 7.50,
  url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
}];

function ProductCard() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   api.get('/customer/products')
  //   .then((response) => {
  //     setProducts(response.data);
  //   })
  //   .catch(() => {});
  // }, []);

  return (
    <div>
      { mockProducts.map((product, index) => (
        <div key={ index }>
          <h3 data-testid="customer_products__element-card-title-">{ product.name }</h3>
          <img
            data-testid="customer_products__img-card-bg-image-"
            src={ product.url_image }
            alt="imagem do produto"
          />
          <h5
            data-testid="customer_products__element-card-price-"
          >
            { `R$${product.price}` }
          </h5>
          <ProductCounterButtons />
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
