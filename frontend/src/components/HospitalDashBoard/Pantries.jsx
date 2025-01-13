import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import axiosInstance from "../../axiosConfig/axiosConfig";

const PantryList = () => {
  const [pantries, setPantries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API fetch with dummy data
  useEffect(() => {
    const fetchPantries = async () => {
      setLoading(true);
      
      try {
        const response = await axiosInstance.get("/pantry/getall");
        if (response.data) {
          console.log("res.dataa : ", response.data.data);
          setPantries(response.data.data);
        }
      } catch (error) {
        console.log("err:",error)
      }finally{
        setLoading(false);
      }
    };

    fetchPantries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-600 h-8 w-8" />
        <span className="ml-3 text-blue-600 font-semibold">
          Loading Pantries...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Pantry List</h2>
      {/* Responsive Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 text-left text-blue-600 font-semibold">
              <th className="px-6 py-3">Pantry Name</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total Meals Delivered</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pantries.map((pantry, index) => (
              <tr
                key={pantry._id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4 font-medium">{pantry.name}</td>
                <td className="px-6 py-4">{pantry.location}</td>
                <td className="px-6 py-4">
                  {pantry.status === "Active" ? (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-2" /> Active
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle className="mr-2" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{pantry.assignedTasks?.length}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline flex items-center">
                    <FaEye className="mr-2" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Cards for smaller screens */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {pantries.map((pantry) => (
          <div
            key={pantry._id}
            className="bg-white rounded-lg shadow-md p-4 space-y-2"
          >
            <h3 className="text-lg font-bold text-blue-600">{pantry.name}</h3>
            <p>
              <span className="font-semibold">Location:</span> {pantry.location}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {pantry.status === "Active" ? (
                <span className="text-green-500 flex items-center">
                  <FaCheckCircle className="mr-1" /> Active
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <FaTimesCircle className="mr-1" /> Inactive
                </span>
              )}
            </p>
            <p>
              <span className="font-semibold">Total Meals Delivered:</span>{" "}
              {pantry.assignedTasks?.length}
            </p>
            <button className="text-blue-600 hover:underline flex items-center">
              <FaEye className="mr-2" /> View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantryList;
