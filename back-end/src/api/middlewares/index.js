const { validationJoi } = require('./validationJoi');
const { validationCustomer } = require('./validationJwt');
const { errorHandler } = require('./ErrorHandler');

module.exports = {
  validationJoi,
  validationCustomer,
  errorHandler,
};
