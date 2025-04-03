const express = require('express')
const router = express.Router()
const userController = require('./../controller/user.controller')
const authMiddleware = require('./../middleware/auth.middleware')

router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.get('/:id', userController.getUserById)
router.get('/', userController.getAllUsers)
router.put('/', authMiddleware("member"), userController.updateUserById)
router.put('/:id', authMiddleware("admin"), userController.updateUserByIdAdmin)
router.delete('/:id', userController.deleteUserById)

module.exports = router