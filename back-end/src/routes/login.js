const express = require('express');

const loginRouter = express.Router();

const userController = require('../controllers/user');

// Adicionar rotas:
// -post

loginRouter.post('/', userController.login);

module.exports = loginRouter;
