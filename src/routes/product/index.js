const express = require('express');
const router = express.Router();
const verifyApiKey = require('../../middlewares/verifyApiKey.middleware');
const checkPermission = require('../../middlewares/checkPermission.middleware');
const PERMISSIONS = require('../../constants/apiKeyPermissions.constant');
const asyncErrorHandler = require('../../utils/asyncHandler');
const authenticate = require('../../middlewares/authenticate.middleware');
const productController = require('../../controllers/product.controller');

router.use(asyncErrorHandler(verifyApiKey));

router.post(
  '/products/create',
  authenticate,
  checkPermission(PERMISSIONS.SHOP_CREATE),
  asyncErrorHandler(productController.create)
);

router.get(
  '/products/:id',
  authenticate,
  asyncErrorHandler(productController.getById)
);

router.get(
  '/products',
  asyncErrorHandler(productController.getAllPublic) // public route
);

router.patch(
  '/products/:id',
  authenticate,
  checkPermission(PERMISSIONS.SHOP_UPDATE),
  asyncErrorHandler(productController.update)
);

router.delete(
  '/products/:id',
  authenticate,
  checkPermission(PERMISSIONS.SHOP_DELETE),
  asyncErrorHandler(productController.delete)
);

module.exports = router;
