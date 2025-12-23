import { BsFillChatHeartFill } from "react-icons/bs";
import { User } from "./User";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherUser, fetchUser, setSelectedUser, clearUnread } from "../redux/userSlice";
import toast from "react-hot-toast";

export const UserInterface = ({ setMobileChatOpen }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { user, otherUsers, selectedUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchOtherUser());
  }, [dispatch]);

  const filteredUser = search
    ? otherUsers.filter(u =>
        u.userName.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName.toLowerCase().includes(search.toLowerCase())
      )
    : otherUsers;

  const handleUserClick = (users) => {
    dispatch(setSelectedUser(users));
    setSearch("");
    dispatch(clearUnread(users._id));

    if (window.innerWidth < 768 ) {
      setMobileChatOpen(true); // Open chat on mobile
    }
  };

 



  const handleLogout = async () => {
    const res = await fetch("http://localhost:5000/api/v1/user/logout", {
      method: "POST",
      credentials: "include"
    });
    const data = await res.json();
    if (data.success) {
      navigate("/login");
      toast.success("Logged out successfully!");
    }
  };

 return (
    <div className="bg-[#1e1e1e] text-white h-screen flex flex-col w-full md:w-[350px] border-r border-gray-800">
      {/* Header */}
      <div className="flex gap-2 p-4 items-center border-b border-gray-700">
        <BsFillChatHeartFill className="text-2xl" />
        <h1 className="font-bold text-xl">Chat App</h1>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here"
          className="w-full p-2 rounded bg-[#2a2b2e] text-white"
        />
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {filteredUser.map(u => (
          <div
            key={u._id}
            onClick={() => handleUserClick(u)}
            className={`p-2 rounded cursor-pointer transition-all
              ${selectedUser?._id === u._id ? "bg-blue-600" : "bg-[#2a2b2e] hover:bg-[#343541]"}
            `}
          >
            <User users={u} />
          </div>
        ))}
      </div>

      {/* Footer: Current User + Logout */}
      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <img src={user?.avatar} className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="font-semibold">{user?.fullName}</h1>
            <h1 className="text-gray-400 text-sm">@{user?.userName}</h1>
          </div>
        </div>
        <button onClick={handleLogout} className="bg-blue-500 px-3 py-1 rounded-sm text-white">
          Logout
        </button>
      </div>
    </div>
  );
};
