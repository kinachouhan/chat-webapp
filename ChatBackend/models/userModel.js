import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
     fullName : {
        type: String,
        required: true
     },
     userName :{
        type: String,
        required: true,
        unique : true
     },
     password: {
        type: String,
        required: true
     },
     confirmPassword: {
        type: String,
     },
     gender: {
        type: String,
        required: true
     },
     avatar :{
        type: String,
        required: true
     }
} , {timestamps: true})

export const User = mongoose.model("User" , userSchema)
