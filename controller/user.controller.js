const jwt = require('jsonwebtoken')
const User = require('./../model/user.model')
const Role = require('./../model/role.model')
const bcrypt = require('bcrypt')
require("dotenv").config()

exports.signin = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || req.body.password === "" || req.body.email === "") {
      return res.status(400).json({ message: "Email and password are required", success: false })
    }
    let role = await Role.findOne({ label: 'member' })
    let user = await User.create({
      emai: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      roles: [role._id]
    })
    res.status(201).json({
      _id: user._id,
      email: user.email,
      roles: user.roles,
      token: jwt.sign({
        _id: user._id,
        email: user.email,
        roles: user.roles
      }, process.env.JWT_SECRET, { expiresIn: '1h' })
    })
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || req.body.password === "" || req.body.email === "") {
      return res.status(400).json({ message: "Email and password are required", success: false })
    }
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({
        message: "Invalid password or email",
        success: false
      })
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: "Invalid password or email", success: false })
    }
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      roles: user.roles,
      token: jwt.sign({
        _id: user._id,
        email: user.email,
        roles: user.roles
      }, process.env.JWT_SECRET, { expiresIn: '1h' })
    })
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}

exports.getUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User id is required", success: false })
    }
    let user = await User.findOne({ _id: req.params.id })
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}

exports.updateUserById = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || req.body.password === "" || req.body.email === "") {
      return res.status(400).json({ message: "Email and password are required", success: false })
    }
    if (!req.token._id) {
      return res.status(400).json({ message: "User id is required", success: false })
    }

    let user = await User.findByIdAndUpdate(req.token._id, {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    }, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found", success: false })
    }
    res.status(200).json({
      message: "User updated successfully",
      success: true,
    })
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}

exports.updateUserByIdAdmin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || req.body.password === "" || req.body.email === "") {
      return res.status(400).json({ message: "Email and password are required", success: false })
    }
    if (!req.params.id) {
      return res.status(400).json({ message: "User id is required", success: false })
    }

    let user = await User.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    }, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found", success: false })
    }
    res.status(200).json({
      message: "User updated successfully",
      success: true,
    })
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}

exports.deleteUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User id is required", success: false })
    }

    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      res.status(404).json({ message: "User not found", success: false })
    }
    res.status(200).json({
      message: "User deleted successfully",
      success: true
    })
  } catch (error) {
    res.status(400).json({ message: error.message, success: false })
  }
}