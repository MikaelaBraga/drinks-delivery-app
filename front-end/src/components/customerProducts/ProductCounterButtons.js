import React from 'react';

function ProductCounterButtons() {
  const [count, setCount] = useState(0);

  const handleClick = () => {

  };

  return (
    <div>
      <button
        data-testid="customer_products__button-card-add-item-"
        type="button"
        onClick={ handleClick }
      >
        +
      </button>
      <p data-testid="customer_products__input-card-quantity-">{ count }</p>
      <button
        data-testid="customer_products__button-card-rm-item-"
        type="button"
        onClick={ handleClick }
      >
        -
      </button>
    </div>
  );
}

export default ProductCounterButtons;
