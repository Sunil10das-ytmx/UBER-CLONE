const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../CONTROLLER/ride.controller.js');
const authMiddleware = require('../MIDDLEWARE/auth.middleware.js');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Location'),
    body('drop').isString().isLength({ min: 3 }).withMessage('Invalid Drop Location'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
);

module.exports = router;