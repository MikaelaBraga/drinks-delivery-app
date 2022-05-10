const express = require('express');

const customerRouter = express.Router();

const productController = require('../controllers/product');

const saleController = require('../controllers/sale');
const { validationJoi, validationCustomer } = require('../middlewares');
const { postSale } = require('../schemas');

// O fluxo do cliente deve garantir que seja possível:
// - Navegar e escolher produtos
// -- getAllProducts --getProductById
customerRouter.get('/products', validationCustomer, productController.getAll);
// --- customerRouter.get('/products', auth, productController.getAll)
// --- customerRouter.get('/products/:id', auth, productController.getById)
customerRouter.get('/products/:id', validationCustomer, productController.getById);
// - Adicionar produtos ao carrinho
// - Fazer checkout (gerar uma nova venda)
customerRouter.post('/order', validationCustomer, validationJoi(postSale), saleController.post);
// -- postSale
// - Consultar pedidos e acessar detalhes do mesmo.
// -- getSalesByUserId
customerRouter.get('/orders/:id', validationCustomer, saleController.getById);

module.exports = customerRouter;
