const { ForbiddenError } = require('../utils/responses/appError');
const ERROR_MESSAGES = require('../constants/errorMessages');

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
