const pick = require('lodash/pick');

const getInfoData = ({ fields = [], object = {} }) => {
  return pick(object, fields);
};

module.exports = {
  getInfoData,
};
