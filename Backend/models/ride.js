const mongoose=require("mongoose");
const Schema=mongoose.Schema;



const rideSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    captain:{
        type:Schema.Types.ObjectId,
        ref:'captain',
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","cancelled","completed","ongoing"],
        default:'pending',
    },
    duration:{
        type:Number
    },
    distance:{
        type:Number
    },
    paymentID:{
        type:String,
    },
    orderID:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false
    }
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports=Ride;
