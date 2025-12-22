import express from "express"
import { getMessage, sendMessage } from "../Controllers/messageController.js"
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/sendmessage/:reciverId" , isAuthenticated ,  sendMessage)
router.get("/getmessage/:otherParticipantsId", isAuthenticated, getMessage);



export default router