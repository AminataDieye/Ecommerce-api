const express = require('express')
const { createCart, oneCart } = require('../../controllers/cart')
const router = express.Router()

router.post('/', createCart)
router.get('/:id', oneCart)

module.exports=router