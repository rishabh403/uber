const Captain=require("../models/captain");
const captainService=require("../services/captain.js");
const {validationResult}=require("express-validator");
const blackListTokenModel=require("../models/blackListToken.js");


module.exports.registerCaptain= async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {fullname,email,password,vehicle}=req.body;
    const isCaptainExist =await Captain.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({message:"This captain already exists"});
    }
    const hashedPassword=await Captain.hashPassword(password);
    const captain=captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password : hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token=captain.generateAuthToken;
    return res.status(201).json({token,captain});
};

module.exports.loginCaptain=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {email,password}=req.body;
    const captain=await Captain.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: "this captain does not exist"});
    }
    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Incorrect Password"});
    }
    const token=captain.generateAuthToken();
    res.cookie('token',token);
    return res.status(201).json({token,captain});
};

module.exports.profileCaptain=async (req,res,next)=>{
    return res.status(200).json(req.captain);
};

module.exports.logoutCaptain =async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({token});
    res.clearCookie("token");
    return res.status(200).json({message:"logged out successfully"});
};