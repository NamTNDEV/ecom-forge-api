const SUCCESS_MESSAGES = require('../constants/successMessages');
const ProductService = require('../services/product/product.service');
const {
  CreatedSuccess,
  OkSuccess,
} = require('../utils/responses/successResponse');

class ProductController {
  create = async (req, res) => {
    new CreatedSuccess({
      message: SUCCESS_MESSAGES.PRODUCT_CREATED,
      metadata: await ProductService.createProduct({
        category: req.body.product_category,
        payload: {
          ...req.body,
          product_shop_id: req.keysInfo.user,
        },
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
