const express = require('express');
const userController = require('../controllers/user.controller.js');
const authHandler = require('../middleware/auth.js');
const httpRequestHandler = require('../middleware/httpRequest.js');
const router = express.Router();

router.route('/kakao/code').get(httpRequestHandler(userController.getKakaoUserBeforeLogin));

router.route('/signup').post(httpRequestHandler(userController.signUp));

router.route('/token').post(authHandler.loginRequired, httpRequestHandler(userController.refreshToken));

module.exports = router;