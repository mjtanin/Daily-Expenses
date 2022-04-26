const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

// @disc    Create a new user
// @routes  /api/users
// @access  Public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error("Please include all fields")
  }

  const existsUser = await User.findOne({email})

  if(existsUser){
    res.status(400)
    throw new Error("User Already Exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashPassword
  })

  if(user){
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    }
    res.status(201).json(userData)
  }
})


// @disc    Login a user
// @routes  /api/users/login
// @access  Public
const userLogin = asyncHandler( async (req, res) => {
  const {email, password} = req.body

  const existsUser = await User.findOne({email})

  if(existsUser){
    if(email === existsUser.email && await bcrypt.compare(password, existsUser.password)){
      res.status(200).json({
        id: existsUser._id,
        name: existsUser.name,
        email,
        token: generateToken(existsUser._id)
      })
    }else {
      res.status(404)
      throw new Error("Invalid password")
    }
  }else {
    res.status(404)
    throw new Error("Invalid Email Address")
  }
})

// @disc    Get current user
// @routes  /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user)
})

module.exports = { userLogin, userRegister, getMe }