const mongoose = require('mongoose');
const bcrypt = required('bcrypt');
const jwt = required('jsonwebtoken');

const userSchema=new mongoose.Schema({
    fullname:{
        fullname:{
            type:String,
            required:true,
            trim:true,
        },
        lastname:{
            type:String,
            trim:true,
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:Number,
        required:true,
        unique:true,
        select:false
    },
    socketID:{
        type:String
    }    
})

userSchema.methods.generateRefreshToken =async function(password){
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
  )
  return TokenExpiredError;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,12);
}
 
export const userModel = mongoose.model('user',userSchema)