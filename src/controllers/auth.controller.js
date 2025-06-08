const SUCCESS_MESSAGES = require('../constants/successMessages');
const AuthService = require('../services/auth.service');
const { CreatedSuccess } = require('../utils/responses/successResponse');

class AuthController {
  signUp = async (req, res) => {
    const { name, email, password } = req.body;
    new CreatedSuccess({
      message: SUCCESS_MESSAGES.SHOP_CREATED,
      metadata: await AuthService.signup({ name, email, password }),
    }).send(res);
  };
}

module.exports = new AuthController();
