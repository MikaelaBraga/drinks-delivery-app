const express = require('express');

const customerRouter = express.Router();

// O fluxo do cliente deve garantir que seja possível:
// - Navegar e escolher produtos
// -- getAllProducts --getProductById
// --- customerRouter.get('/products', auth, productController.getAll)
// --- customerRouter.get('/products/:id', auth, productController.getById)
// - Adicionar produtos ao carrinho
// - Fazer checkout (gerar uma nova venda)
// -- postSale
// - Consultar pedidos e acessar detalhes do mesmo.
// -- getSalesByUserId

module.exports = customerRouter;
