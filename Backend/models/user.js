const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema = new Schema({
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
    socketId:{
      type:String
    }
  });

  userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
  }

  userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
  }

  userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
  }

  const User = mongoose.model('user', userSchema);
  module.exports=User;