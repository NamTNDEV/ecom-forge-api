const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');

router.post('/shops/signup', authController.signUp);

module.exports = router;
