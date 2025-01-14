// LoginPantry.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { setCookie } from '../../axiosConfig/cookieFunc';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';

const LoginPantry = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch()
  
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/pantry/login', credentials);
      if(response.data){
          console.log("data : " , response.data)
          setCookie("accessToken", response.data.data.token, 7);
          dispatch(login({ user: response.data.data.user, type: "Pantry" }));
          navigate('/pantry/dashboard');

      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="max-w-lg my-5 mx-auto p-8 border shadow-lg mt-10 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login Pantry Manager</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={credentials.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account? <Link to="/pantry-register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
};

export default LoginPantry;
