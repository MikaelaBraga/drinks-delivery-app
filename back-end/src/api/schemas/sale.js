const joi = require('joi');

const postSale = joi.object({
  userId: joi.number().integer().required().messages({
    'number.base': 'userId must be a number',
    'number.integer': 'userId must be an integer',
    'any.required': 'userId is required',
  }),
  sellerId: joi.number().integer().required().messages({
    'number.base': 'sellerId must be a number',
    'number.integer': 'sellerId must be an integer',
    'any.required': 'sellerId is required',
  }),
  totalPrice: joi.number().positive().required().messages({
    'number.base': 'totalPrice must be a number',
    'number.positive': 'totalPrice must be positive',
    'any.required': 'totalPrice is required',
  }),
  deliveryAddress: joi.string().required().messages({
    'string.base': 'deliveryAddress must be a string',
    'any.required': 'deliveryAddress is required',
  }),
  deliveryNumber: joi.number().integer().required().messages({
    'number.base': 'deliveryNumber must be a number',
    'number.integer': 'deliveryNumber must be an integer',
    'any.required': 'deliveryNumber is required',
  }),
});

module.exports = { postSale };
