const joi = require('joi');

const loginUser = joi.object({
  email: joi.string().required().email().messages({
    'string.base': 'email must be a string',
    'string.email': 'email must be a valid email',
    'any.required': 'email is required',
  }),
  password: joi.string().min(6).required().messages({
    'string.base': 'password must be a string',
    'string.min': 'password must be longer than 6 characters',
    'any.required': 'password is required',
  }),
});

const registerCustomer = joi.object({
  name: joi.string().min(12).required().messages({
    'string.base': 'name must be a string',
    'string.min': 'name length must be at least 12 characters long',
    'any.required': 'name is required',
  }),
  email: joi.string().required().email().messages({
    'string.base': 'email must be a string',
    'string.email': 'email must be a valid email',
    'any.required': 'email is required',
  }),
  password: joi.string().min(6).required().messages({
    'string.base': 'password must be a string',
    'string.min': 'password must be longer than 6 characters',
    'any.required': 'password is required',
  }),
});

module.exports = { 
  loginUser,
  registerCustomer, 
};
