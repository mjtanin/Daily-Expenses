const express = require('express')
const { userLogin, userRegister, getMe } = require('../controllers/usersController')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')

router.post('/', userRegister)
router.post('/login', userLogin)
router.get('/me', protect, getMe)

module.exports = router

