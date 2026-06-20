const express = require('express');
// const { ExpressValidator } = require('express-validator');
const router = express.Router();
const {body}=require('express-validator')
const userController = require('../CONTROLLER/user.controller.js')
const { authUser } = require('../MIDDLEWARE/auth.middleware.js')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').notEmpty().withMessage('Enter your fullname'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long')
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password is Invalid')
],
userController.loginUser
)

router.get('/profile',authUser,userController.getUserProfile);

router.get('/logout',authUser,userController.logoutUser)

module.exports=router;