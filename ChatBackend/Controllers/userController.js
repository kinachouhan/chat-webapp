import {asyncHandler} from "../Utilities/asyncHandler.js"
import {errorHandler} from "../Utilities/errorHandler.js"
import {User} from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const signUp = asyncHandler(async(req , res , next )=> {
        const {userName , fullName , password  , gender } = req.body

        if(!userName || !fullName || !password  || !gender){
             return  next(new errorHandler("All fields are required", 400))
        }

        const user = await User.findOne({userName})

        if(user){
            return next(new errorHandler("User alreday exist" , 400))
        }

        const avatarType = gender === "male" ? "boy" : "girl"

        const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${userName}`

        const hashedPassword = await bcrypt.hash( password , 10)

        const newUser = await User.create({
             fullName,
             userName,
             gender,
             password : hashedPassword,
             avatar
        })

      const tokenData = {
        _id : newUser?._id
      }

      const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn : process.env.EXPIRES_IN})

     res.status(200)
     .cookie("token" , token ,
        {
            expires : new Date( Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
            httpOnly : true,
            
            sameSite: "lax",
            secure: false,
        }
     )
     .json({
        success: true,
        responseData : {
            newUser ,
            token
        }
     })
})    


export const login = asyncHandler( async(req , res , next)=>{
      const {userName , password} = req.body
   
   
      if(!userName || !password){
         return next( new errorHandler("Username and password is required", 404))
      }

      const user = await User.findOne({userName})

      if(!user){
         return next(new errorHandler("Invalid username and password", 400))
      }

      const isValidPassword = await bcrypt.compare(password , user.password)

      if(!isValidPassword){
         return next(new errorHandler("Invlaid username and password", 400))
      }
 
      const tokenData = {
        _id: user?._id
      }

      const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn: process.env.EXPIRES_IN})

      res.status(200)
      .cookie("token", token ,{
           expires : new Date( Date.now() +  process.env.COOKIE_EXPIRE*60*60*24*1000),
           httpOnly: true,
          
           sameSite: "lax",
            secure: false,
      })
      .json({
         success: true,
         responseData :{
             user ,
             token
         }
      }) 
})

export const logout = asyncHandler( (req , res)=>{
    console.log("Cookies:", req.cookies);
    res.status(200)
    .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    .json({
        success: true,
        message: "Logged out suucessfully."
    })
})


export const getProfile = asyncHandler( async(req , res)=>{
     const userId = req.user._id

     const profile = await User.findById(userId)

     res.status(200).json({
        success: true,
        responseData : profile
     })
})


export const getOtherUsers = asyncHandler( async(req , res)=>{
        const otherUsers = await User.find({
            _id : {$ne : req.user._id }
        })

        res.status(200).json({
            success: true,
            responseData: otherUsers
        })
})