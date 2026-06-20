const captainModel = require('../MODELS/captain.model.js');
const captainService = require('../SERVICES/captain.service.js')
const {validationResult} = require('express-validator')
const blacklistModel = require('../MODELS/blacklist.model.js')

// ! generate captainRegistration 
module.exports.registerCaptain= async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname,email,password,vehicle}= req.body;

    const isCaptianAlreadyExist = await captainModel.findOne({email});

    if(isCaptianAlreadyExist){
        return res.status(400).json({message:'Captain already exist'})
    }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType

         }); 
    
            const token = await captain.generateAuthToken();

            res.status(200).json({ token, captain });
}

// ! captain Login
module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
       if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
       }
    
       const {email,password}=req.body;
    
       const captain = await captainModel.findOne({email}).select('+password');
    
       if(!captain){
          return res.status(401).json({message:'Invalid email or password'})
       }
    
       const isMatch = await captain.comparePassword(password);
    
       if(!isMatch){
          return res.status(401).json({message:'Invalid email or password'});
       }
    
       const token = await captain.generateAuthToken();

       res.cookie('token',token)
    
       res.status(200).json({token,captain})
}

// ! get captain profile
module.exports.getCaptainProfile = async(req,res,next)=>{
    res.status(200).json(req.captain)
}

// !logout captain
module.exports.captainLogout = async(req,res,next)=>{
    res.clearCookie('token');
    
        let token;
        if (req.cookies && req.cookies.token) {
           token = req.cookies.token;
        } else if (req.headers && req.headers.authorization) {
           const parts = req.headers.authorization.split(' ');
           token = parts.length === 2 ? parts[1] : parts[0];
        }
    
        if (!token) {
           return res.status(400).json({ message: 'No token provided' });
        }
    
        await blacklistModel.create({ token });
    
        res.status(200).json({ message: 'logged out' });
}