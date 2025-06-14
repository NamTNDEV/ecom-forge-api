const COMMON = require('./common.success');
const AUTH = require('./auth.success');
const PRODUCT_SUCCESS_MESSAGES = require('./product.success');

module.exports = {
  ...COMMON,
  ...AUTH,
  ...PRODUCT_SUCCESS_MESSAGES,
};
