const rideService = require('../SERVICES/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, drop, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination: drop,
            vehicleType
        });
        return res.status(201).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
 