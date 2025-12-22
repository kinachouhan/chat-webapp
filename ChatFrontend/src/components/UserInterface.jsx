import { BsFillChatHeartFill } from "react-icons/bs";
import { User } from "./User"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchOtherUser, fetchUser, setSelectedUser , clearUnread } from "../redux/userSlice";


export const UserInterface = () => {

    const navigate = useNavigate()
   const [search, setSearch] = useState("");


    const handleLogout = async () => {
        const response = await fetch("http://localhost:5000/api/v1/user/logout", {
            method: "POST",
            credentials: "include"
        }
        )
        const data = await response.json()
        if (data.success === true) {
            navigate("/login")
        }
    }

    const dispatch = useDispatch()

    const { user, loading, error, otherUsers, selectedUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(fetchOtherUser())
    }, [dispatch]);


    const filteredUser =  search ?
    otherUsers.filter( (user)=>{
         return(
             user.userName.toLowerCase().includes(search.toLowerCase()) || user.fullName.toLowerCase().includes(search.toLowerCase())
         )
    })
    : otherUsers
 
    const handleUserClick = (users)=>{
         dispatch(setSelectedUser(users))
         setSearch("")
         dispatch( clearUnread(users._id))
    }


    return (
        <div className="bg-[#1e1e1e] text-white  h-screen border-r border-gray-800 flex flex-col gap-4 relative max-w-[350px] w-full">
            <div className=" p-4 rounded-sm flex gap-2 justify-center items-center ">
                <h1 className="text-2xl"><BsFillChatHeartFill /></h1>
                <h1 className="font-bold text-2xl">Chat App</h1>
            </div>


            <div className="h-1 w-full border-b border-gray-400"></div>


            <div className="px-4">

                <input value={search}  onChange={(e)=>setSearch(e.target.value)} className="bg-[#2a2b2e] p-2 rounded-sm w-full" placeholder="Search here" />

            </div>


            <div className="p-2 flex flex-col gap-5 overflow-y-auto flex-1">
                {
                    filteredUser.map((users) => {
                        return (
                            <div key={users._id}
                                onClick={()=>handleUserClick(users)}
                                className={`p-2 rounded cursor-pointer transition-all
            ${selectedUser?._id === users._id
                                        ? "bg-blue-600"
                                        : "bg-[#2a2b2e] hover:bg-[#343541]"
                                    }`}
                            >
                                <User users={users} key={users._id} />
                            </div>
                        )

                    })
                }
            </div>


            <div className=" flex flex-col ">
                <div className="h-1 w-full border-b border-gray-400"></div>
                <div className="flex p-4 justify-between">
                    <div className="flex gap-4 items-center">
                        <img className="w-[50px] h-[50px]" src={user?.avatar} />
                        <div>
                            <h1>{user?.fullName}</h1>
                            <h1>@{user?.userName}</h1>
                        </div>

                    </div>
                    <div className="flex items-center">
                        <button onClick={handleLogout} className="bg-blue-500 p-2 rounded-sm ">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}