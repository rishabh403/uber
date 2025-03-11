const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const cors=require("cors");
const app=express();
const mongoose = require('mongoose');
const cookieParser=require("cookie-parser");
const axios = require('axios');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//connection with db
let dbUrl=process.env.DB_URL
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}


const userRoutes=require("./routes/user.js");
const captainRoutes=require("./routes/captain.js");
const mapRoutes=require("./routes/map.js");
const rideRoutes=require("./routes/ride.js");



app.get("/",(req,res)=>{
    res.send("hello world");
});

app.use("/users",userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps",mapRoutes);
app.use("/rides",rideRoutes);


module.exports =app;