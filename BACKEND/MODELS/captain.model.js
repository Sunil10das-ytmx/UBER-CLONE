const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'Firstname must be at least 8 character long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Lastname must be at least 2 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,"Please enetr a valid email"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 7 character long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be at least 7 character long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[2,'Capacity must be at least 2']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken = async function(){
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

// fullname.lastname field corrected above

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,12);
}
 

const captainModel =  mongoose.model('captain',captainSchema);

module.exports = captainModel;