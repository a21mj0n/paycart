const genericCrud = require('./generic.controller');
const { Categories } = require('../models');

module.exports = {
  ...genericCrud(Categories)
};