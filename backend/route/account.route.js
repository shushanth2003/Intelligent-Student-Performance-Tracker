const express=require('express');
const router=express.Router();
const {register,login}=require("../controller/register.controller.js")

//create an account

router.post("/register",register);
// login page
router.post("/login", login);

module.exports=router;