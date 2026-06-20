const express = require('express')
const router = express.Router()
const {body} = require("express-validator")
const captainController = require('../CONTROLLER/captain.controller.js')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min: 1 }).withMessage('Color is required'),
    body('vehicle.plate').isLength({ min: 1 }).withMessage('Plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicleType')
],
 captainController.registerCaptain
)


module.exports =  router;