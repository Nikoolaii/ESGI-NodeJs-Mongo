const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../model/user.model')
const userController = require('./../controller/user.controller')

router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.get('/:id', userController.getUserById)
router.get('/', userController.getAllUsers)
router.put('/:id', userController.updateUserById)
router.delete('/:id', userController.deleteUserById)

module.exports = router