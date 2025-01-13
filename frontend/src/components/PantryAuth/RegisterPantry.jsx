// RegisterPantry.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../axiosConfig/axiosConfig';

const RegisterPantry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactInfo: '',
    location: '',
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/pantry', formData);
      if(response.data){
        console.log("data : " , response.data)
      }
      
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="max-w-lg my-5 mx-auto p-8 border shadow-lg mt-10 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Register Pantry Manager</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        <div>
          <label htmlFor="contactInfo" className="block">Contact Info</label>
          <input 
            type="text" 
            id="contactInfo" 
            name="contactInfo" 
            value={formData.contactInfo} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
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
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/pantry-login" className="text-blue-600">login</Link>
      </p>
    </div>
  );
};

export default RegisterPantry;
