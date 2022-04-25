const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')


// @disc    Create a new user
// @routes  /api/users
// @access  Public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error("Please include all fields")
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  res.status(201).json({
    name,
    email,
    password: hashPassword
  })
})


// @disc    Login a user
// @routes  /api/users/login
// @access  Public
const userLogin = (req, res) => {
  res.send('login routes')
}

module.exports = { userLogin, userRegister }