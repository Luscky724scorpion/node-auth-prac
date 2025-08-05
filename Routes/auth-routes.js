const express=require('express')
const router=express.Router()
const{registerUser,loginUser}=require('../Controllers/auth-controller')

//routes related to user auth
router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports=router