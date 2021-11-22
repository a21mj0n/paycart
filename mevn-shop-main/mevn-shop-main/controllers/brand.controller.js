const genericCrud = require('./generic.controller');
const { Brands } = require('../models');

module.exports = {
  ...genericCrud(Brands)
};