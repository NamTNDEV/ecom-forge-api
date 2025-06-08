const { ERROR_MESSAGES } = require('../constants/message.constant');
const { ForbiddenError } = require('../utils/appError');

const checkPermission = (...allowedPermissions) => {
  return async (req, res, next) => {
    const permissions = req.apiKeyInfo?.permissions || [];
    const hasAll = allowedPermissions.every(p => permissions.includes(p));
    if (!hasAll) {
      throw new ForbiddenError(ERROR_MESSAGES.INSUFFICIENT_PERMISSIONS);
    }
    return next();
  };
};

module.exports = checkPermission;
