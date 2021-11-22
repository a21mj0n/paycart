const product = require('./product.controller');
const category = require('./category.controller');
const auth = require('./auth.controller');
const brand = require('./brand.controller');

module.exports = {
  category,
  product,
  brand,
  auth,
};