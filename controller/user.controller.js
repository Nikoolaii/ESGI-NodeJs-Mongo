const jwt = require('jsonwebtoken')
const User = require('./../model/user.model')
const bcrypt = require('bcrypt')

exports.signin = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || req.body.password === "" || req.body.email === "") {
      return res.status(400).json({ error: "Email and password are required" })
    }
    let user = await User.create({
      emai: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || req.body.password === "" || req.body.email === "") {
      return res.status(400).json({ error: "Email and password are required" })
    }
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({
        error: "Invalid password or email"
      })
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ error: "Invalid password or email" })
    }
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      token: jwt.sign({
        _id: user._id,
        email: user.email,
      }, process.env.JWT_SECRET, { expiresIn: '1h' })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.updateUserById = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteUserById = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}