const express=require("express");
const router=express.Router();
const captainController=require("../controllers/captain.js");
const {body}=require("express-validator");
const { authCaptain } = require("../middleware/auth.middleware.js");

router.post("/register",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be of minimum length 3'),
    body('password').isLength({min:6}).withMessage('password should be of minimum length 6'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be atleast 3 char long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be of minimum length 3')
],
    captainController.registerCaptain
);

router.post("/login",[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password should be of minimum length 6'),
],
    captainController.loginCaptain
);

router.get("/profile",authCaptain,captainController.profileCaptain);

router.get("/logout",authCaptain,captainController.logoutCaptain);



module.exports = router;