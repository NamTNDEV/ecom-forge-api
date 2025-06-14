const { model, Schema } = require('mongoose');

const baseOptions = {
  collection: 'Electronics',
  timestamps: true,
};

const electronicSchema = new Schema(
  {
    brand: String,
    model: String,
    specs: Schema.Types.Mixed,
    product_shop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
  },
  baseOptions
);

module.exports = model('Electronic', electronicSchema);
