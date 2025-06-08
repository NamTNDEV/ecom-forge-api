const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const ShopRoles = require('../constants/shopRoles.constant');
const { createTokenPair } = require('../utils/jwt');
const {
  ConflictError,
  InternalServerError,
} = require('../utils/responses/appError');
const ERROR_MESSAGES = require('../constants/errorMessages');

class AuthService {
  static signup = async ({ name, email, password }) => {
    const exitedShop = await shopModel.findOne({ email }).lean();
    if (exitedShop) {
      throw new ConflictError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: hashedPassword,
      roles: [ShopRoles.SHOP],
    });
    if (!newShop) {
      throw new InternalServerError(ERROR_MESSAGES.FAILED_TO_CREATE_NEW_SHOP);
    }
    // --- Generate RSA key pair ---
    // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    //   modulusLength: 2096,
    //   publicKeyEncoding: {
    //     type: 'spki',
    //     format: 'pem',
    //   },
    //   privateKeyEncoding: {
    //     type: 'pkcs8',
    //     format: 'pem',
    //   },
    // });

    // const publicKeyString = keyTokenService.createKeyToken({
    //   userId: newShop._id,
    //   publicKey: publicKey,
    // });

    // if (!publicKeyString) {
    //   return {
    //     code: 'xxxx',
    //     message: 'Public key is error',
    //   };
    // }

    // const tokens = createTokenPair(
    //   { userId: newShop._id, email },
    //   privateKey
    // );
    // --- End for RSA Version ---

    // --- JWT Basic Level Version ---
    const accessSecretKey = crypto.randomBytes(64).toString('hex');
    const refreshSecretKey = crypto.randomBytes(64).toString('hex');
    const tokens = createTokenPair(
      { userId: newShop._id, email },
      accessSecretKey,
      refreshSecretKey
    );
    const _ = await keyTokenService.createKeyToken({
      userId: newShop._id,
      accessSecretKey,
      refreshSecretKey,
    });
    return {
      tokens,
    };
  };
}

module.exports = AuthService;
