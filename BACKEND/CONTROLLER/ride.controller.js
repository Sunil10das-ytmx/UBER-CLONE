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

        // Safe async broadcast (won't crash HTTP response or swallow errors)
        (async () => {
            try {
                let pickupCoordinate = { ltd: 22.5726, lng: 88.3639 };
                try {
                    pickupCoordinate = await mapService.getAddressCoordinate(pickup);
                } catch (e) {
                    console.warn('[CreateRide] geocoding fallback used:', e.message);
                }

                let captainsInRadius = [];
                try {
                    captainsInRadius = await mapService.getcaptainsInRadius(pickupCoordinate.ltd, pickupCoordinate.lng, 50);
                } catch (e) {
                    console.warn('[CreateRide] getcaptainsInRadius warning:', e.message);
                }

                if (!captainsInRadius || captainsInRadius.length === 0) {
                    captainsInRadius = await captainModel.find({ socketId: { $exists: true, $ne: null } });
                }

                ride.otp = "";
                const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user').select('+otp');
                const ridePayload = rideWithUser || ride;

                // 1. Broadcast to 'captains' room
                sendMessageToSocketId('captains', {
                    event: 'new-ride',
                    data: ridePayload
                });

                // 2. Broadcast to captain personal room and socketId
                if (Array.isArray(captainsInRadius)) {
                    captainsInRadius.forEach(captain => {
                        sendMessageToSocketId(`captain_${captain._id}`, {
                            event: 'new-ride',
                            data: ridePayload
                        });
                        if (captain.socketId) {
                            sendMessageToSocketId(captain.socketId, {
                                event: 'new-ride',
                                data: ridePayload
                            });
                        }
                    });
                }
                console.log(`[CreateRide] Broadcasted new-ride ${ride._id} to captains`);
            } catch (broadcastErr) {
                console.error('[CreateRide] Error in socket broadcast:', broadcastErr);
            }
        })();

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