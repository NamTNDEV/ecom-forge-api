const ClothingProduct = require('./strategies/clothing.strategies');
const { BadRequestError } = require('../../utils/responses/appError');
const ERROR_MESSAGES = require('../../constants/errorMessages');
const {
  PRODUCT_CATEGORIES,
} = require('../../constants/productCategories.constant');

class ProductFactory {
  static productRegistry = {};

  static registerProductType(category, productClass) {
    ProductFactory.productRegistry[category] = productClass;
  }

  static createProduct({ category, payload }) {
    const ProductClass = ProductFactory.productRegistry[category];

    if (!ProductClass) {
      throw new BadRequestError(ERROR_MESSAGES.INVALID_PRODUCT_CATEGORY);
    }

    return new ProductClass(payload).createProduct();
  }

  // static createProduct({ category, payload }) {
  //   switch (category) {
  //     case PRODUCT_CATEGORIES.CLOTHING:
  //       return new ClothingProduct(payload).createProduct();
  //     default:
  //       throw new BadRequestError(ERROR_MESSAGES.INVALID_PRODUCT_CATEGORY);
  //   }
  // }
}

module.exports = ProductFactory;
