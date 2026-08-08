const rideService = require('../SERVICES/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../SERVICES/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../MODELS/ride.model');
const captainModel = require('../MODELS/captain.model');

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

        res.status(201).json(ride);
        
        const pickupCoordinate = await mapService.getAddressCoordinate(pickup);

        let captainsInRadius = await mapService.getcaptainsInRadius(pickupCoordinate.ltd, pickupCoordinate.lng, 2);

        // Fallback for testing: if no captain is within 2km, notify any connected captain with a socketId
        if (!captainsInRadius || captainsInRadius.length === 0) {
            captainsInRadius = await captainModel.find({ socketId: { $exists: true, $ne: null } });
        }

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user').select('+otp');

        // Broadcast to 'captains' room so all active captains receive the pop-up
        sendMessageToSocketId('captains', {
            event: 'new-ride',
            data: rideWithUser || ride
        });

        if (Array.isArray(captainsInRadius)) {
            captainsInRadius.forEach(captain => {
                if (captain.socketId) {
                    console.log(`Sending new-ride event to captain ${captain._id} (socketId: ${captain.socketId})`);
                    sendMessageToSocketId(captain.socketId, {
                        event: 'new-ride',
                        data: rideWithUser || ride
                    });
                }
            });
        }

    } catch (err) {
        console.error("Error creating ride:", err);
        if (!res.headersSent) {
            return res.status(500).json({ message: err.message });
        }
    }
};
 

module.exports.getFare = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {pickup,destination} = req.query;

    try{
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        if (ride.user && ride.user.socketID) {
            sendMessageToSocketId(ride.user.socketID, {
                event: 'ride-confirmed',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error confirming ride:", err);
        return res.status(500).json({ message: err.message });
    }
};


module.exports.startRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {rideId,otp} = req.query;

    try{
        const ride = await rideService.startRide({rideId,otp,captain:req.captain})
        if (ride.user && ride.user.socketID) {
            sendMessageToSocketId(ride.user.socketID, {
                event: 'ride-started',
                data: ride
            });
        }
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ride = await rideService.endRide({
            rideId: req.body.rideId,
            captain: req.captain
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};