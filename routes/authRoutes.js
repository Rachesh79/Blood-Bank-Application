const express = require('express')
const { registerController, currentUserController } = require('../controllers/authController')
const { loginController } = require('../controllers/authController')
const  authMiddleware  = require('../middlewares/authMiddleware')


const router = express.Router()

// routes
// Register || Post
router.post('/register', registerController)

// Login
router.post('/login',loginController)

// get current user
router.get('/current-user',authMiddleware, currentUserController)

module.exports = router