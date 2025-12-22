
import mongoose from "mongoose"


export const connectDb = async()=>{
   try {
       const instance = await mongoose.connect(process.env.MONGO_URL)
       console.log(`Mongodb connected ${instance.connection.host}`)
    
   } catch (error) {
       console.log(error)
   }
}