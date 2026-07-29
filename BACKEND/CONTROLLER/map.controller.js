const mapService = require('../SERVICES/maps.service.js');
const { validationResult } = require('express-validator');


//! getCoordinates 
module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;

    try {
        const coordinate = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinate);
    } catch (error) {
        res.status(404).json({ message: 'Coordinate not found' });
    }
};


// !getDistanceAndTime
module.exports.getDistanceAndTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceAndTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// !getAutoSuggestions
module.exports.getAutoSuggestions=async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {input} = req.query;
        const suggestion =await mapService.getAutoSuggestions(input);
        res.status(200).json(suggestion);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Interval server error'})
    }
}