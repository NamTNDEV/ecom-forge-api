const HTTP_STATUS = require('../constants/httpStatusCodes.constant');
const AuthService = require('../services/auth.service');

class AuthController {
  signUp = async (req, res) => {
    const { name, email, password } = req.body;
    return res
      .status(HTTP_STATUS.CREATED)
      .json(await AuthService.signup({ name, email, password }));
  };
}

module.exports = new AuthController();
