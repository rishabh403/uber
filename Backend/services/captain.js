const Captain=require("../models/captain.js");

module.exports.createCaptain = async ({
    firstname,lastname,email,password,
    color,plate,capacity,vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('all fields are required');
    }
    const newcaptain=Captain.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle : {
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return newcaptain;
}