const { model, Schema } = require('mongoose');

const CLOTHING_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  UNISEX: 'unisex',
};

const baseOptions = {
  collection: 'Clothings',
  timestamps: true,
};

const clothingSchema = new Schema(
  {
    brand: String,
    size: String,
    material: String,
    color: String,
    product_shop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(CLOTHING_GENDER),
      default: CLOTHING_GENDER.UNISEX,
    },
  },
  baseOptions
);

module.exports = model('Clothing', clothingSchema);
