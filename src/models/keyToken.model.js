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
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: _COLLECTION_NAME,
  }
);

module.exports = model(_DOCUMENT_NAME, keyTokenSchema);
