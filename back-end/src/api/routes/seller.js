const express = require('express');

const saleController = require('../controllers/sale');
const { validationSeller } = require('../middlewares/validationJwt');
const { validationJoi } = require('../middlewares/validationJoi');
const { updateSale } = require('../schemas');

const sellerRouter = express.Router();

// O fluxo da pessoa vendedora deve garantir que é possível:
// - Listar pedidos relacionados àquela pessoa vendedora
// -- getSalesBySellerId
sellerRouter.get('/orders/:id', validationSeller, saleController.getSaleByIdSeller);
sellerRouter.get('/orders', validationSeller, saleController.getSalesBySeller);
// - Manipular o status desses pedidos.
// -- putSales
sellerRouter.put('/orders/:id',
validationSeller,
validationJoi(updateSale),
saleController.updateSaleStatusSeller);

module.exports = sellerRouter;
