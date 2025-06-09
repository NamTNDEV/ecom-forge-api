const { Schema, model } = require('mongoose');

const _COLLECTION_NAME = 'KeyToken';
const _DOCUMENT_NAME = 'KeyTokens';

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    accessTokenSecret: {
      type: String,
      required: true,
    },
    refreshTokenSecret: {
      type: String,
      required: true,
    },
    usedRefreshTokens: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: _COLLECTION_NAME,
  }
);

module.exports = model(_DOCUMENT_NAME, keyTokenSchema);
