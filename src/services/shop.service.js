const shopModel = require('../models/shop.model');

class ShopService {
  static async findByEmail({ email, select = {} }) {
    try {
      return await shopModel.findOne({ email }).select(select).lean();
    } catch (error) {
      throw new InternalServerError(
        ERROR_MESSAGES.FAILED_TO_FIND_SHOP_BY_EMAIL || error.message
      );
    }
  }
}

module.exports = ShopService;
