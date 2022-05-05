import React from 'react';
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

function ProductsCards() {
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
      { mockProducts.map((product, key) => (
        <div key={ key }>
          <h3>{ product.name }</h3>
          <img src={ product.url_image } alt="imagem do produto" />
          <h5>{ product.price }</h5>
        </div>
      )) }
    </div>
  );
}

export default ProductsCards;
