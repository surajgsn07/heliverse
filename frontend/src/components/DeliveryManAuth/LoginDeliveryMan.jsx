import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { setCookie } from "../../axiosConfig/cookieFunc";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

const LoginDeliveryPerson = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/delivery/login", {
        email,
        password,
      });

      if(response.data){
        console.log("Data : " , response.data);
        setCookie("accessToken", response.data.data.token, 7);
        dispatch(login({ user: response.data.data.user, type: "Delivery" }));
        navigate('/delivery/dashboard');

      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md my-5 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Login Delivery Person</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      <p className="text-center mt-4">
        Don't have an account? <Link to="/delivery-register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
};

export default LoginDeliveryPerson;
