const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//reginster controller
const registerUser = async (req, res) => {
  try {
    //extract user info from req body
    const { username, email, password, role } = req.body;

    //check if user already exist
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "Try with a different name, user already exists",
      });
    }
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating new user
    const newlyCreatedUSer = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newlyCreatedUSer.save();

    if (newlyCreatedUSer) {
      res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Did not work please try again",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "please try again",
    });
  }
};
//Login controller

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //find if current user exists in db
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "try again",
      });
    }
    //password match
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials plaese try again",
      });
    }
    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "14m",
      }
    );
    res.status(200).json({
      success: true,
      message: "login successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "please try again",
    });
  }
};
const changePassword=async(req,res)=>{
  try {
    const userId=req.userInfo.userId

    //extract old and new password
    const{oldPassword,newPassword}=req.body;
    
    const user = await user.findById(userId)

    if(!user){
      return res.status(400).json({
        success:false,
        message:"user not found"
      })
    }
      //check old password is correct 
      const isPasswordMatch= await bcrypt.compare(oldPassword,user.password);

      if(!isPasswordMatch){
        return res.status(400).json({
          success:false,
          message:"passowrd not correct"
        })
      }
      const salt=await bcrypt.genSalt(10);
      const newHashPassword= await bcrypt.hash(newPassword,salt)

      //update user password
      user.password=newHashPassword
      await user.save()

      res.status(200).json({
        success:true,
        message:"user returned successful"

  })

    }
   catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "password change controller issue try again",
  })
};
};
module.exports = { registerUser, loginUser,changePassword };
