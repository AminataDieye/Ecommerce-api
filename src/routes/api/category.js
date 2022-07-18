const { addCategory, allCategory, oneCategory } = require('../../controllers/category')
const { isAdmin, auth } = require('../../auth/auth')

const express = require('express')
const router = express.Router()
router.post('/', auth, isAdmin, addCategory)
router.get('/', allCategory)
router.get('/:id', oneCategory)

module.exports = router