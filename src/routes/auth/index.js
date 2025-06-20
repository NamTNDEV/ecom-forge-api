const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const verifyApiKey = require('../../middlewares/verifyApiKey.middleware');
const checkPermission = require('../../middlewares/checkPermission.middleware');
const PERMISSIONS = require('../../constants/apiKeyPermissions.constant');
const asyncErrorHandler = require('../../utils/asyncHandler');
const authenticate = require('../../middlewares/authenticate.middleware');

// router.use(asyncErrorHandler(verifyApiKey));

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

router.post(
  '/shops/logout',
  asyncErrorHandler(authenticate),
  asyncErrorHandler(authController.logout)
);

router.post(
  '/shops/refresh-token',
  asyncErrorHandler(authController.refreshToken)
);

module.exports = router;
