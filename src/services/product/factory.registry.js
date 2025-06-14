const {
  PRODUCT_CATEGORIES,
} = require('../../constants/productCategories.constant');
const ProductFactory = require('./productFactory');
const ClothingProduct = require('./strategies/clothing.strategies');

const productStrategies = {
  [PRODUCT_CATEGORIES.CLOTHING]: ClothingProduct,
  // Add other product strategies here
};

Object.entries(productStrategies).forEach(([category, classRef]) => {
  ProductFactory.registerProductType(category, classRef);
});

module.exports = ProductFactory;
