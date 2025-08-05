const Image = require("../Models/image");
const{ uploadToCloudinary }=require('../cloudinary-helpers/cloudinary-helpers');
const clodinary= require("../config/cloudinary");
const fs=require("fs")
const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File required.Please upload Image",
      })}
      const{url,publicId}=await uploadToCloudinary(req.file.path)

      //store image and public id in db

      const newlyUploadedImage=new Image({
        url,
        publicId,
        uploadedBy:req.userInfo.userId
      })
      await newlyUploadedImage.save()
      //removes from locals
      fs.unlinkSync(req.file.path)
      res.status(201).json({
        success:true,
        message:'Image uploaded',
        image:newlyUploadedImage
      })
    }
  catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "uploadImage route issue",
      });
  }
};
const fetchImage=async(req,res)=>{
    try {
        
    const images=await Image.find({});
    if(images){
        res.status(200).json({
            success:true,
            data:images,
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Get image issue"
        })
        
    }
}
module.exports={uploadImageController,fetchImage}