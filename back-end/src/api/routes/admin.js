const express = require('express');

const { validationJoi } = require('../middlewares');
const { validationAdmin } = require('../middlewares/validationJwt');
const { registerCustomer } = require('../schemas');
const userController = require('../controllers/user');

const adminRouter = express.Router();

// O fluxo da pessoa administradora deve possibilitar:
// - O cadastro de clientes e pessoas vendedoras
// -- postUser, usando rota register?
// - Tal como a remoção dos mesmos.
// -- deleteUser, usando rota register?

adminRouter.post(
  '/register',
  validationAdmin,
  validationJoi(registerCustomer),
  userController.register,
);

adminRouter.delete(
  '/user/:id',
  validationAdmin,
  userController.removeUser,
);

module.exports = adminRouter;
