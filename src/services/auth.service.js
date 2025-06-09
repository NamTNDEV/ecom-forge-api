const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const ShopRoles = require('../constants/shopRoles.constant');
const { createTokenPair, verifyToken } = require('../utils/jwt');
const {
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} = require('../utils/responses/appError');
const ERROR_MESSAGES = require('../constants/errorMessages');
const ShopService = require('./shop.service');
const KeyTokenService = require('./keyToken.service');

class AuthService {
  static signin = async ({ email, password }) => {
    // 1. Tìm shop theo email (phải lấy cả password nên dùng select)
    const existingShop = await ShopService.findByEmail({ email });
    if (!existingShop) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
    }

    const {
      _id: shopId,
      email: shopEmail,
      password: shopPassword,
    } = existingShop;

    // 2. So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, shopPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
    }

    // 3. Tạo token pair
    const accessSecretKey = crypto.randomBytes(64).toString('hex');
    const refreshSecretKey = crypto.randomBytes(64).toString('hex');
    const tokens = createTokenPair(
      { userId: shopId, email: shopEmail },
      accessSecretKey,
      refreshSecretKey
    );
    const _ = await keyTokenService.storeKeyToken({
      userId: shopId,
      refreshToken: tokens.refreshToken,
      accessSecretKey,
      refreshSecretKey,
    });
    return {
      tokens,
    };
  };

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
    const _ = await keyTokenService.storeKeyToken({
      userId: newShop._id,
      refreshToken: tokens.refreshToken,
      accessSecretKey,
      refreshSecretKey,
    });
    return {
      tokens,
    };
  };

  static logout = async userId => {
    return await keyTokenService.deleteKeyTokenByUserId(userId);
  };

  static refreshToken = async ({ refreshToken: refreshTokenFromClient }) => {
    if (await KeyTokenService.isRefreshTokenReused(refreshTokenFromClient)) {
      console.warn('⚠️ Reused refresh token detected. Possible token theft!');
      const reusedRecord = await keyTokenService.findByUsedRefreshToken(
        refreshTokenFromClient
      );
      if (reusedRecord && reusedRecord.user) {
        await keyTokenService.deleteKeyTokenByUserId(reusedRecord.user);
        console.warn(
          `🧨 All sessions deleted for userId: ${reusedRecord.user}`
        );
      } else {
        console.warn(`⚠️ Cannot identify user of reused token`);
      }
      throw new UnauthorizedError();
    }

    const foundRefreshToken = await keyTokenService.findByRefreshToken(
      refreshTokenFromClient
    );

    if (!foundRefreshToken) {
      console.error(
        '❌ No key token found for the provided refresh token from client'
      );
      throw new UnauthorizedError();
    }

    const decodedToken = verifyToken(
      refreshTokenFromClient,
      foundRefreshToken.refreshTokenSecret
    );

    const shop = await ShopService.findByEmail({ email: decodedToken.email });
    if (!shop) {
      console.error(`❌ No shop found for email:: ${decodedToken.email}`);
      throw new UnauthorizedError();
    }
    const newAccessSecret = crypto.randomBytes(64).toString('hex');
    const newRefreshSecret = crypto.randomBytes(64).toString('hex');

    const tokens = createTokenPair(
      { userId: shop._id, email: shop.email },
      newAccessSecret,
      newRefreshSecret
    );
    const _ = await keyTokenService.storeKeyToken({
      userId: shop._id,
      refreshToken: tokens.refreshToken,
      accessSecretKey: newAccessSecret,
      refreshSecretKey: newRefreshSecret,
      usedRefreshTokens: [
        ...foundRefreshToken.usedRefreshTokens,
        refreshTokenFromClient,
      ],
    });
    return {
      tokens,
    };
  };
}

module.exports = AuthService;
