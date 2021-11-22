const router = require('express-promise-router')();
const { check } = require('express-validator');
const { auth } = require('../controllers');

router.post(
  '/register',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Min length password is 8 characters').isLength({ min: 8 }),
  ],
  auth.register
);

router.post(
  '/login',
  [
    check('email', 'Email is required').normalizeEmail().isEmail(),
    check('password', 'Password is required').exists(),
  ],
  auth.login,
);

module.exports = router;