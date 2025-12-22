import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SignUp = ()=>{

     const navigate = useNavigate()

    const [userData , setUserData] = useState({
         fullName: "",
         userName: "",
         password: "",
         confirmPassword: "",
         gender: "male"
    })

    const handleInput = (e)=>{
         const {name , value } = e.target
         setUserData({
            ...userData,
            [name]: value
         })
    }

 


    const handleSignUp = async()=>{
         const response = await fetch("http://localhost:5000/api/v1/user/signup" , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userData)
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
                <h1 className="text-center text-2xl text-blue-500 p-2">Sign Up</h1>
                <div className="flex flex-col gap-5 p-2 ">
                    <input className="p-2 w-full border border-gray-700 rounded-sm" placeholder="Enter FullName" name="fullName" onChange={handleInput}/>
                    <input  className="p-2 w-full border border-gray-700 rounded-sm" placeholder="Enter UserName" name="userName" onChange={handleInput}/>
                    <input onChange={handleInput} className="p-2 w-full border border-gray-700 rounded-sm" placeholder="Enter Password" name="password"/>
                    <input onChange={handleInput} className="p-2 w-full border border-gray-700 rounded-sm"  placeholder="Enter Confirm Password" name="confrimPassword"/>
                </div>
                <div className="flex p-4 gap-5">
                    <label>
                        <input onChange={handleInput} className="text-blue" type="radio" value="male" name="gender"/> Male
                    </label>
                    <label>
                        <input onChange={handleInput} type="radio" name="gender" value="female"/> Female
                    </label>
                </div>
                <button onClick={handleSignUp} className="bg-blue-500 p-2 rounded-sm text-white" >Sign Up</button>
                <p className="text-center p-2 text-gray-600">Alreday have an account? <span onClick={()=> navigate("/login")} className="text-blue-500 cursor-pointer">Login</span></p>
            </div>
        </div>
     )
}