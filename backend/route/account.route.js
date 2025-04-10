const express=require('express');
const router=express.Router();
const {register,login,studentdataset}=require("../controller/register.controller.js")

//create an account

router.post("/register",register);
// login page
router.post("/login", login);

//dataset checking
router.get('/students', studentdataset);

module.exports=router;