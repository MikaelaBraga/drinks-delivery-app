const express = require('express');

const sellerRouter = express.Router();

// O fluxo da pessoa vendedora deve garantir que é possível:
// - Listar pedidos relacionados àquela pessoa vendedora
// -- getSalesBySellerId
// - Manipular o status desses pedidos.
// -- putSales

module.exports = sellerRouter;
