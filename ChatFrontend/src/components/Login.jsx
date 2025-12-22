
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = ()=>{

    const navigate = useNavigate()

    const [userData , setUserData] = useState({
         userName: "",
         password: ""
    })

    const handleInput = (e)=>{
         const {name , value} = e.target

         setUserData({
            ...userData,
            [name]: value
         })
    }

    const handleLogin = async()=>{
         const response = await fetch("http://localhost:5000/api/v1/user/login" , {
             method: "POST",
             headers: {
                "Content-Type" : "application/json"
             },
             body: JSON.stringify(userData),
              credentials: "include"
         })

         const data = await response.json()
         console.log(data)
         if(data.success === true){
             navigate("/")
         }
    }


     return(
         <div className="flex bg-black h-screen flex-col justify-center items-center "> 
         <div className="bg-[#2a2b2e] p-4 rounded-sm  flex flex-col max-w-[30rem] w-full text-white  ">
                <h1 className="text-center text-2xl text-blue-500 p-2">Login</h1>
                <div className="flex flex-col gap-5 p-2 ">
                    <input  className="p-2 w-full border border-gray-700 rounded-sm" onChange={handleInput} placeholder="Enter UserName" name="userName"/>
                    <input  className="p-2 w-full border border-gray-700 rounded-sm" onChange={handleInput} placeholder="Enter Password" name="password"/>
                   
                </div>
               
                <button onClick={handleLogin} className="bg-blue-500 p-2 rounded-sm text-white m-2" >Login</button>
                <p className="text-center p-2 text-gray-600">Doesn't have an account? <span onClick={()=>navigate("/signup")} className="text-blue-500 cursor-pointer">Login</span></p>
            </div>
        </div>
     )
}