const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const verifyApiKey = require('../../middlewares/verifyApiKey');
const checkPermission = require('../../middlewares/checkPermission');
const PERMISSIONS = require('../../constants/apiKeyPermissions.constant');
const { asyncErrorHandler } = require('../../middlewares/handleError');

// router.use(verifyApiKey);

router.post(
  '/shops/signup',
  // checkPermission(PERMISSIONS.SHOP_CREATE),
  asyncErrorHandler(authController.signUp)
);

router.post(
  '/shops/signin',
  // checkPermission(PERMISSIONS.SHOP_READ),
  asyncErrorHandler(authController.signIn)
);

module.exports = router;
