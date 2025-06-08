const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const verifyApiKey = require('../../middlewares/verifyApiKey');
const checkPermission = require('../../middlewares/checkPermission');
const PERMISSIONS = require('../../constants/apiKeyPermissions.constant');

router.use(verifyApiKey);

router.post(
  '/shops/signup',
  checkPermission(PERMISSIONS.SHOP_CREATE),
  authController.signUp
);

module.exports = router;
