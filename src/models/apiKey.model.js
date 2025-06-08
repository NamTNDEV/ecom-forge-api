const { Schema, model } = require('mongoose');
const PERMISSIONS = require('../constants/apiKeyPermissions.constant');

const _DOCUMENT_NAME = 'ApiKey';
const _COLLECTION_NAME = 'ApiKeys';

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: 'No description provided',
    },
    permissions: {
      type: [
        {
          type: String,
          enum: PERMISSIONS,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: _COLLECTION_NAME,
  }
);

module.exports = model(_DOCUMENT_NAME, apiKeySchema);
