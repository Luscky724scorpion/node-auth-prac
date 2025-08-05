const express=require('express')
const router=express.Router()
const{registerUser,loginUser}=require('../Controllers/auth-controller')
const authMiddleware=require("../middlewares/auth-middleware")
//routes related to user auth
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post("./changed-passowrd",changePassword)
module.exports=router