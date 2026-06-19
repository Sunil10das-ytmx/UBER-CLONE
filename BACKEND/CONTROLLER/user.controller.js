const userModel = require('../MODELS/user.model.js')
const userServices = require('../SERVICES/user.service.js') 
const {validationResult} = require('express-validator')

// !registration user
module.exports.registerUser=async(req,res,next)=>{
     const errors =  validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
     }

     const{fullname,email,password} = req.body;

     const hashedPassword = await userModel.hashPassword(password);

     const user=await userServices.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
     }); 

   const token = await user.generateAuthToken();

     res.status(200).json({token, user});
}

// !login user
module.exports.loginUser = async(req,res,next)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }

   const {email,password}=req.body;

   const user = await userModel.findOne({email}).select('+password');

   if(!user){
      return res.status(401).json({message:'Invalid email or password'})
   }

   const isMatch = await user.comparePassword(password);

   if(!isMatch){
      return res.status(401).json({message:'Invalid email or password'});
   }

   const token = await user.generateAuthToken();

   res.status(200).json({token,user})
}

// !Get Profile
module.exports.getUserProfile = async(req,res,next)=>{
   res.status(200).json(req.user)
}