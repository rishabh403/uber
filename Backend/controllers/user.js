const User=require("../models/user.js");
const userService=require("../services/user.js");
const {validationResult} = require("express-validator");
const blackListTokenModel=require("../models/blackListToken.js");

module.exports.registerUser= async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {fullname,email,password}=req.body;
    const isUserExist =await User.findOne({email});
    if(isUserExist){
        return res.status(400).json({message:"This user already exists"});
    }
    const hashedPassword =await User.hashPassword(password);
    const user=userService.createUser({firstname:fullname.firstname,lastname:fullname.lastname,email,password : hashedPassword});
    const token=user.generateAuthToken;
    return res.status(201).json({token,user});
};

module.exports.loginUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {email,password}=req.body;
    const user=await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: "invalid email or password"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "invalid password"});
    }
    const token=user.generateAuthToken();
    res.cookie('token',token);
    return res.status(201).json({token,user});
};

module.exports.getProfile =async(req,res,next)=>{
    return res.status(200).json(req.user);
};

module.exports.logoutUser=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({token});
    res.clearCookie("token");
    return res.status(200).json({message:"logged out successfully"});
};