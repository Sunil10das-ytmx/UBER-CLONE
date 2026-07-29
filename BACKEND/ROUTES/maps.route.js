const express = require('express');
const router = express.Router();
const { authUser } = require('../MIDDLEWARE/auth.middleware.js');
const mapController = require('../CONTROLLER/map.controller.js');
const { query } = require('express-validator');

router.get('/get-coordinates', 
    query('address').isString().isLength({ min: 3 }), 
    authUser, 
    mapController.getCoordinates
);

router.get('/get-distance-time', 
    query('origin').isString().isLength({ min: 3 }), 
    query('destination').isString().isLength({ min: 3 }), 
    authUser, 
    mapController.getDistanceAndTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authUser,
    mapController.getAutoSuggestions
)

module.exports = router;

