const genericCrud = require('./generic.controller');
const { Products } = require('../models');

module.exports = {
  ...genericCrud(Products),
};