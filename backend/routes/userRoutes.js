const express = require('express')
const { userLogin, userRegister } = require('../controllers/usersController')
const router = express.Router()

router.post('/', userRegister)
router.post('/login', userLogin)

module.exports = router

