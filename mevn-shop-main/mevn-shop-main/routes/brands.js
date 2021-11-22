const router = require('express-promise-router')();
const { brand } = require('../controllers');

router.route('/:id').get(brand.get);
router.route('/').get(brand.getAll);
router.route('/').post(brand.create);
router.route('/:id').put(brand.update);
router.route('/:id').delete(brand.delete);

module.exports = router;
