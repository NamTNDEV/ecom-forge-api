const { Product: productModel } = require('../../../models/product');

// Base Product Class
class ProductBase {
  constructor(payload) {
    this.product_name = payload.product_name;
    this.product_thumb = payload.product_thumb;
    this.product_description = payload.product_description;
    this.product_price = payload.product_price;
    this.product_quantity = payload.product_quantity;
    this.product_category = payload.product_category;
    this.product_shop_id = payload.product_shop_id;
    this.product_attributes = payload.product_attributes;
  }

  async createProduct(productId) {
    return await productModel.create({
      ...this,
      _id: productId,
    });
  }
}

module.exports = ProductBase;
