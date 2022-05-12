const joi = require('joi');

const { SaleStatus } = require('../enums/SaleStatus');

const postSale = joi.object({
  products: joi.array().items(
    joi.object({
      productId: joi.number().integer().positive().required()
      .messages({
        'number.base': 'productId must be a number',
        'number.integer': 'productId must be an integer',
        'number.positve': 'productId must be positive',
        'any.required': 'productId is required',
      }),
      quantity: joi.number().integer().positive().required()
      .messages({
        'number.base': 'quantity must be a number',
        'number.integer': 'quantity must be an integer',
        'number.positve': 'quantity must be positive',
        'any.required': 'quantity is required',
      }), 
    }),
  ).min(1).required()
  .messages({
    'array.base': 'products must be an array',
    'array.min': 'products must have at least 1 item',
    'any.required': 'products is required',
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

const updateSale = joi.object({
  status: joi.string().valid(SaleStatus.PREPARANDO, SaleStatus.A_CAMINHO).required().messages({
    'string.base': 'status must be a string',
    'any.only': 'status must be either PREPARANDO OR A CAMINHO',
    'any.required': 'status is required',
  }),
});

module.exports = { postSale, updateSale };
