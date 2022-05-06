import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [checkout, setCheckout] = useState([]);
  const [orders, setOrders] = useState([]);

  const contextValue = {
    checkout,
    setCheckout,
    orders,
    setOrders,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
