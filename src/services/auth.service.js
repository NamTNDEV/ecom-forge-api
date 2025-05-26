const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const ShopRoles = require('../constants/shopRoles.constant');
const { createTokenPair } = require('../utils/jwt');

class AuthService {
  static signup = async ({ name, email, password }) => {
    try {
      const exitedShop = await shopModel.findOne({ email }).lean();
      if (exitedShop) {
        return {
          code: 'xxxx',
          message: 'Shop already exists',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashedPassword,
        roles: [ShopRoles.SHOP],
      });
      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
          },
        });
        const publicKeyString = keyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey,
        });

        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'Public key is error',
          };
        }

        const tokens = createTokenPair(
          { userId: newShop._id, email },
          privateKey
        );

        return {
          code: 201,
          metadata: {
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AuthService;
