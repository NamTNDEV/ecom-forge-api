const AuthService = require('../services/auth.service');

class AuthController {
  signUp = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      return res
        .status(201)
        .json(await AuthService.signup({ name, email, password }));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
