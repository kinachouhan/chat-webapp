import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    const response = await fetch("http://localhost:5000/api/v1/user/signup", {
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
      toast.success("Account created!!")
    }else{
        toast.error("Signup failed")
    }
  };

  return (
    <div className="flex bg-black min-h-screen justify-center items-center px-4">
      <div className="bg-[#2a2b2e] p-6 rounded-lg flex flex-col w-full max-w-md text-white shadow-lg">
        <h1 className="text-center text-3xl text-blue-500 font-bold mb-4">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <input
            className="p-3 w-full border border-gray-700 rounded-md bg-[#1e1f23] text-white placeholder-gray-400"
            placeholder="Enter Full Name"
            name="fullName"
            onChange={handleInput}
          />
          <input
            className="p-3 w-full border border-gray-700 rounded-md bg-[#1e1f23] text-white placeholder-gray-400"
            placeholder="Enter Username"
            name="userName"
            onChange={handleInput}
          />
          <input
            type="password"
            className="p-3 w-full border border-gray-700 rounded-md bg-[#1e1f23] text-white placeholder-gray-400"
            placeholder="Enter Password"
            name="password"
            onChange={handleInput}
          />
          <input
            type="password"
            className="p-3 w-full border border-gray-700 rounded-md bg-[#1e1f23] text-white placeholder-gray-400"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleInput}
          />
        </div>

        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={userData.gender === "male"}
              onChange={handleInput}
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={userData.gender === "female"}
              onChange={handleInput}
            />
            Female
          </label>
        </div>

        <button
          onClick={handleSignUp}
          className="bg-blue-500 p-3 rounded-md text-white mt-5 hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>

        <p className="text-center p-2 text-gray-400 mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
