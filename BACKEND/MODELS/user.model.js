const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
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
        type:String,
        required:true,
        select:false,
        minlength:[8,'Password must be at least 8 characters']
    },
    socketID:{
        type:String
    }
})

userSchema.methods.generateAuthToken = async function(){
  const token = jwt.sign(
    {
      _id: this.id,
    },
    process.env.TOKEN_SECRET,
    {
        expiresIn:'24h'
    }
  )
  return token;
}

userSchema.methods.generateRefreshToken = async function(){
  return this.generateAuthToken();
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,12);
}
 
module.exports = mongoose.model('user', userSchema);