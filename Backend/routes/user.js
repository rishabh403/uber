const express= require("express");
const router=express.Router();
const {body}=require("express-validator");
const userController=require("../controllers/user.js");
const authmiddleware=require("../middleware/auth.middleware.js");

router.post("/register",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be of minimum length 3'),
    body('password').isLength({min:6}).withMessage('password should be of minimum length 6')
],
    userController.registerUser
);

router.post("/login",[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:3}).withMessage('password minimum length: 3')
],
    userController.loginUser
);

router.get("/profile",authmiddleware.authUser,userController.getProfile);
router.get("/logout",authmiddleware.authUser,userController.logoutUser);


module.exports=router;