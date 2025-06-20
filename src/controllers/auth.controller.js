const SUCCESS_MESSAGES = require('../constants/successMessages');
const AuthService = require('../services/auth.service');
const {
  CreatedSuccess,
  OkSuccess,
} = require('../utils/responses/successResponse');

class AuthController {
  signUp = async (req, res) => {
    const { name, email, password } = req.body;
    new CreatedSuccess({
      message: SUCCESS_MESSAGES.SHOP_CREATED,
      metadata: await AuthService.signup({ name, email, password }),
    }).send(res);
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;
    new OkSuccess({
      message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
      metadata: await AuthService.signin({ email, password }),
    }).send(res);
  };

  logout = async (req, res) => {
    const { user: userId } = req.keysInfo;
    await AuthService.logout(userId);
    new OkSuccess({
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESSFUL,
    }).send(res);
  };

  refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    new OkSuccess({
      message: SUCCESS_MESSAGES.REFRESH_TOKEN_SUCCESSFUL,
      metadata: await AuthService.refreshToken({
        refreshToken,
      }),
    }).send(res);
  };
}

module.exports = new AuthController();
