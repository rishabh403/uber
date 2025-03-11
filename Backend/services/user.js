const User=require("../models/user.js");

module.exports.createUser = async ({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('all fields are required');
    }
    const newuser=User.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return newuser;
}