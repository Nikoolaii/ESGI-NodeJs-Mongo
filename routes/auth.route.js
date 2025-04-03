const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../model/user.model')

router.post('/signin', async (req, res, next) => {
  let user = await User.create(req.body)
  res.status(201).json(user)
})

router.post('/login', async (req, res, next) => {

  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(401).json({
      error: "Invalid password or email"
    })
  }
  if (user.password !== req.body.password) {
    return res.status(401).json({ error: "Invalid password or email" })
  }
  return res.status(200).json(jwt.sign({ user }, "mysecretkey"))
})

router.get('/:id', async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id })
  res.status(200).json(user)
})

router.get('/', async (req, res, next) => {
  let users = await User.find()
  res.status(200).json(users)
})

router.put('/:id', async (req, res) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    res.status(404).json({ message: "User not found" })
  }
  res.status(200).json(user)
})

router.delete('/:id', async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    res.status(404).json({ message: "User not found" })
  }
  res.status(200).json(user)
})

module.exports = router