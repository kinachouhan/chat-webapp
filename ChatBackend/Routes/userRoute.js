import express from "express"
import { getOtherUsers, getProfile, login, logout, signUp } from "../Controllers/userController.js"
import { isAuthenticated } from "../middleware/authMiddleware.js"

const router = express.Router()


router.post("/signup" , signUp)
router.post("/login", login)
router.post("/logout",  logout)
router.get("/getprofile" ,isAuthenticated ,  getProfile)
router.get("/getotherusers" , isAuthenticated , getOtherUsers)








export default router