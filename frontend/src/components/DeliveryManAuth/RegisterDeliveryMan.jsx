import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const RegisterDeliveryPerson = () => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pantries, setPantries] = useState([]);
  const [selectedPantry, setSelectedPantry] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  // Fetch all pantries when the component mounts
  useEffect(() => {
    const fetchPantries = async () => {
      try {
        const response = await axiosInstance.get("/pantry/getall");
        if(response.data){
            setPantries(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching pantries:", error);
      }
    };
    fetchPantries();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/delivery/", {
        name,
        contactInfo,
        email,
        password,
        pantry: selectedPantry,
      });
      if(response.data){
        navigate('/delivery-login')
        console.log("data :", response.data.message)
      }
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering:", error);
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md my-5 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Register Delivery Person</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contact Info</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Pantry</label>
          <select
            className="w-full border rounded-lg p-2"
            value={selectedPantry}
            onChange={(e) => setSelectedPantry(e.target.value)}
            required
          >
            <option value="">-- Select Pantry --</option>
            {pantries.map((pantry) => (
              <option key={pantry._id} value={pantry._id}>
                {pantry.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      <p className="text-center mt-4">
        Already have an account? <Link to="/delivery-login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
};

export default RegisterDeliveryPerson;
