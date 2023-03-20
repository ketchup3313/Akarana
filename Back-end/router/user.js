const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressJoi = require('@escook/express-joi');
const { userCheck } = require('../utils/check');

/**
 * 用户登录接口
 */
router.post('/login', expressJoi(userCheck), userController.loginController);




module.exports = router;