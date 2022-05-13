const express = require('express');

const registerRouter = express.Router();

const userController = require('../controllers/user');
const { validationJoi } = require('../middlewares/validationJoi');
const { registerCustomer } = require('../schemas');

// Adicionar rotas:
// -post

registerRouter.post(
  '/',
  validationJoi(registerCustomer),
  userController.register,
);

module.exports = registerRouter;
