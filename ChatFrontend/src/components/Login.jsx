
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      navigate("/");
      toast.success("Logged in successfully")
    }
    else{
       toast.error("Login Failed")
    }
  };

  return (
    <div className="flex bg-black min-h-screen justify-center items-center px-4">
      <div className="bg-[#2a2b2e] p-6 rounded-lg flex flex-col w-full max-w-md text-white shadow-lg">
        <h1 className="text-center text-3xl text-blue-500 font-bold mb-4">Login</h1>
        <div className="flex flex-col gap-4">
          <input
            className="p-3 w-full border border-gray-700 rounded-md bg-[#1e1f23] text-white placeholder-gray-400"
            onChange={handleInput}
            placeholder="Enter Username"
            name="userName"
          />
          <input
            type="password"
            className="p-3 w-full border border-gray-700 rounded-md bg-[#1e1f23] text-white placeholder-gray-400"
            onChange={handleInput}
            placeholder="Enter Password"
            name="password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 p-3 rounded-md text-white mt-5 hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <p className="text-center p-2 text-gray-400 mt-3">
          Doesn't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
