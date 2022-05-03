const express = require('express');

const registerRouter = express.Router();

const userController = require('../controllers/user');
const { validateBody } = require('../middlewares/validationUser');

// Adicionar rotas:
// -post

registerRouter.post(
  '/',
  validateBody,
  userController.registerCustomer,
);

module.exports = registerRouter;
