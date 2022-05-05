const joi = require('joi');

const postSale = joi.object({
  products: joi.array().items(
    joi.number().integer().positive().messages({
      'number.base': 'product must be a number',
      'number.integer': 'product must be an integer',
      'number.positve': 'number must be positive',
    }),
  ).min(1).required()
  .messages({
    'array.base': 'products must be an array',
    'array.min': 'products must have at least 1 item',
  }),
  sellerId: joi.number().integer().positive().required()
  .messages({
    'number.base': 'sellerId must be a number',
    'number.integer': 'sellerId must be an integer',
    'number.positive': 'totalPrice must be positive',
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
