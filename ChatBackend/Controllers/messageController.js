
import { asyncHandler } from "../Utilities/asyncHandler.js";
import { errorHandler } from "../Utilities/errorHandler.js";
import {Conversation} from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js";


export const sendMessage = asyncHandler(async(req , res , next)=>{
     const senderId = req.user._id
     const reciverId = req.params.reciverId
     const {message} = req.body

     if(!senderId || !reciverId || !message){
         return next(new errorHandler("All fields are required" , 400))
     }

     let conversation = await Conversation.findOne({
        participants: {
            $all:[senderId , reciverId]
        }
    })

    if(!conversation){
        conversation = await Conversation.create({
             participants: [senderId , reciverId]
        })
    }

    const newMessage = await Message.create({
         senderId,
         reciverId,
         message
    })

    if(newMessage){
         conversation.messages.push( newMessage._id)
         await conversation.save()
    }

    res.status(200).json({
         success: true,
         responseData : newMessage
    })
})


export const getMessage = asyncHandler( async(req , res , next)=>{
     const myId = req.user._id
     const otherParticipantsId = req.params.otherParticipantsId
     
     let conversation = await Conversation.findOne({
        participants: {$all: [myId , otherParticipantsId]}
     }).populate("messages")

     res.status(200).json({
         success: true,
         responseData: conversation
     })
})