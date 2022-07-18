const express = require('express')
const router = express.Router()
const { createUser, login, updateUser, allUsers } = require('../../controllers/user')
const { auth, isAdmin } = require('../../auth/auth')
router.post('/signin', createUser)
router.post('/login', login)
router.put('/:id', auth, updateUser)
router.get('/', auth, isAdmin, allUsers)
module.exports = router