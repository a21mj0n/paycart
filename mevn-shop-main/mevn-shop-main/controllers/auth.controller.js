const generic = require('./generic.controller');
const { Users } = require('../models');

module.exports = {
  ...generic(Users),
};