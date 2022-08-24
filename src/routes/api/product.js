const { addProduct, allProducts, oneProduct,
     deleteProduct, updateProduct, productsByCategory } = require('../../controllers/product')
const { auth, isAdmin } = require('../../middleware/auth')
const express = require('express')
const router = express.Router()

router.post('/', auth, isAdmin, addProduct)
router.get('/', allProducts)
router.delete('/:id', auth, isAdmin, deleteProduct)
router.put('/:id', auth, isAdmin, updateProduct)
router.get('/:id', oneProduct)
module.exports = router

