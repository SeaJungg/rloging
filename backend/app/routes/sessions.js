const express = require('express');
const sessionController = require('../controllers/session.controller.js');
const authHandler = require('../middleware/auth.js');
const httpRequestHandler = require('../middleware/httpRequest.js');

const router = express.Router();

router.route('/sessions')
  .post(authHandler.loginRequired, httpRequestHandler(sessionController.postSession));

router.route('/sessions')
  .get(authHandler.loginRequired, httpRequestHandler(sessionController.getSessionsByAttribute));

router.route('/sessions/:session_id')
  .get(authHandler.loginRequired, httpRequestHandler(sessionController.getSessionDetail));

router.route('/sessions/:session_id/apply')
  .post(authHandler.loginRequired, httpRequestHandler(sessionController.applySession));

router.route('/sessions/:session_id/attendees/:user_id')
  .put(authHandler.loginRequired, httpRequestHandler(sessionController.recordAttendance));

router.route('/sessions/:session_id/supporters/:user_id/toggle')
  .put(authHandler.loginRequired, httpRequestHandler(sessionController.applyDailySupporter));

module.exports = router;