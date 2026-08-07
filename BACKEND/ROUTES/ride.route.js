const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const rideController = require('../CONTROLLER/ride.controller.js');
const authMiddleware = require('../MIDDLEWARE/auth.middleware.js');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Location'),
    body('drop').isString().isLength({ min: 3 }).withMessage('Invalid Drop Location'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
);

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    
    rideController.getFare
);

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
);

module.exports = router;