const { Schema } = require('mongoose');
const {
  PRODUCT_CATEGORIES_ENUM,
} = require('../../constants/productCategories.constant');

const baseOptions = {
  collection: 'Products',
  timestamps: true,
};

const baseProductSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_category: {
      type: String,
      enum: PRODUCT_CATEGORIES_ENUM,
      required: true,
    },
    product_shop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  baseOptions
);

module.exports = baseProductSchema;
