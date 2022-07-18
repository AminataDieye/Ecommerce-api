const express = require('express')
const { createCart, getCartById } = require('../../controllers/cart')
const router = express.Router()

router.post('/', createCart)
router.get('/:id', getCartById)

module.exports = router