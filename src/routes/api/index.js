const express = require('express');
const router = express.Router();
router.use('/users',require('./user'));
router.use('/products',require('./product'));
router.use('/category',require('./category'));
router.use('/carts',require('./cart'));

module.exports = router;
