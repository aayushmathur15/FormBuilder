const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async.middleware');
const authController = require('../controllers/auth.controller');

router.post('/login', asyncHandler(authController.login));

module.exports = router;
