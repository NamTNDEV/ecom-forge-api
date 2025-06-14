const ProductFactory = require('./factory.registry');

class ProductService {
  static async createProduct({ category, payload }) {
    return await ProductFactory.createProduct({ category, payload });
  }
}

module.exports = ProductService;
