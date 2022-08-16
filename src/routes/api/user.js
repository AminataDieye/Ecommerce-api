const express = require('express')
const router = express.Router()
const { register, login, updateUser, allUsers, logout, oneUser, verifyUser } = require('../../controllers/user')
const { auth, isAdmin } = require('../../middleware/auth')
router.post('/register', register)
router.post('/login', login)
router.put('/:id', auth, updateUser)
router.get('/verify/:token', verifyUser)
router.get('/', auth, isAdmin, allUsers)
router.get('/profil', auth, oneUser)
router.get('/logout', auth, logout)

module.exports = router