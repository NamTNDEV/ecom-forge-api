const { Clothing: clothingModel } = require('../../../models/product');
const { BadRequestError } = require('../../../utils/responses/appError');
const ERROR_MESSAGES = require('../../../constants/errorMessages');
const ProductBase = require('./baseProduct.strategies');

class ClothingProduct extends ProductBase {
  async createProduct() {
    const newClothing = await clothingModel.create({
      ...this.product_attributes,
      product_shop_id: this.product_shop_id,
    });
    if (!newClothing) {
      console.error('❌ Failed to create clothing attributes');
      throw new BadRequestError(ERROR_MESSAGES.FAILED_TO_CREATE_PRODUCT);
    }
    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) {
      console.error('❌  Failed to create product with clothing attributes');
      throw new BadRequestError(ERROR_MESSAGES.FAILED_TO_CREATE_PRODUCT);
    }

    return newProduct;
  }
}

module.exports = ClothingProduct;
