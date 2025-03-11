const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const captainSchema = new Schema({
    fullname: {
        firstname:{
            type:String,
            required: true,
            minlength:[3,'First name must be atleast 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name must be atleast 3 characters long'],
        }
    },
    username: {
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be valid'],
    },
    password: {
        type:String,
        required: true,
        select: false,
    },
    socketId :{
        type:String
    },
    status : {
        type:String,
        enum:['active','inactive'],
        default : 'inactive',
    },
    vehicle: {
        color: {
            type:String,
            required:true,
            minlength: [3,'Color must be atleast 3 char long!!'],
        },
        plate: {
            type:String,
            required:true,
            minlength: [3,'plate no must be atleast 3 char long!!'],
        },
        capacity : {
            type:Number,
            required:true,
            minlength: [1,'Capacity must be atleast 1!!'],
        },
        vehicleType : {
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }
    },
    location : {
        ltd : {
            type:Number,
        },
        lng : {
            type:Number,
        }
    }
  });

  captainSchema.methods.generateAuthToken =function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
  }

  captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
  }

  captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
  }

  const Captain = mongoose.model('captain', captainSchema);
  module.exports=Captain;