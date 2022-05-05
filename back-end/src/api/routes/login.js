const express = require('express');

const loginRouter = express.Router();

const userController = require('../controllers/user');

const { validationJoi } = require('../middlewares/validationJoi');

const { loginUser } = require('../schemas/user');

// Adicionar rotas:
// -post

loginRouter.post('/', validationJoi(loginUser), userController.login);

module.exports = loginRouter;
