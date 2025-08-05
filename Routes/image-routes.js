  const express=require('express')
  const authMiddleware = require("../middlewares/auth-middleware");
  const adminMiddleware = require("../middlewares/admin-middlewares");
  const uploadMiddleware=require('../middlewares/upload-Middleware')
  const {uploadImageController,fetchImage}=require('../Controllers/image-controllers')
  const router=express.Router()
//upload image
router.post("/upload",authMiddleware,adminMiddleware,uploadMiddleware.single('Image'),uploadImageController)

//get all the images
router.get("/get",authMiddleware,fetchImage)
  module.exports=router