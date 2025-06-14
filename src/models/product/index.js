const { model } = require('mongoose');
const baseProductSchema = require('./baseProduct.model');
const electronicModel = require('./electronic.model');
const clothingModel = require('./clothing.model');

// Base Product Model
const Product = model('Product', baseProductSchema);

// Export all
module.exports = {
  Product,
  Electronic: electronicModel,
  Clothing: clothingModel,
};
