const express = require('express');

const adminRouter = express.Router();

// O fluxo da pessoa administradora deve possibilitar:
// - O cadastro de clientes e pessoas vendedoras
// -- postUser, usando rota register?
// - Tal como a remoção dos mesmos.
// -- deleteUser, usando rota register?

module.exports = adminRouter;
