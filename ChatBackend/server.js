import express from "express"
import { connectDb } from "./dbConfig/dbConnection.js"
import dotenv from "dotenv"
import userRoute from "./Routes/userRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import messageRoute from "./Routes/messageRoute.js"
import {io , server , app} from "./webSocket.js"



dotenv.config()
connectDb()
const PORT = process.env.PORT || 5100

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use(cookieParser())
app.use(express.json())



app.use("/api/v1/user" , userRoute)
app.use("/api/v1/message" , messageRoute)



server.listen(PORT , ()=>{
    console.log("App is listening on 5000  port")
})

