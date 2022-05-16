const { loginUser, registerCustomer } = require('./user');

const { postSale, updateSale } = require('./sale');

module.exports = {
  loginUser,
  registerCustomer,
  postSale,
  updateSale,
};
