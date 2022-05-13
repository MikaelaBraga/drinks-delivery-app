const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/user');
const { validationAdmin } = require('../middlewares/validationJwt');

userRouter.get('/', validationAdmin, userController.getAll);

module.exports = userRouter;
