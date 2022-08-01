const { addProduct, allProducts, oneProduct,
     deleteProduct, updateProduct, productsByCategory } = require('../../controllers/product')
const { isAdmin, auth } = require('../../middleware/auth')
const express = require('express')
const router = express.Router()

router.post('/', auth, isAdmin, addProduct)
router.get('/', allProducts)
router.get('/:id', oneProduct)
router.delete('/:id', auth, isAdmin, deleteProduct)
router.put('/:id', auth, isAdmin, updateProduct)
module.exports = router

