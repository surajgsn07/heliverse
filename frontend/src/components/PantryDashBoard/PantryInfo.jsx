import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig/axiosConfig";

const PantryInfo = () => {
  const user = useSelector((state) => state.auth.user); 
  const [pantryDetails, setPantryDetails] = useState(user); // State to hold pantry info
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // State for error handling
  const [assignedTasks, setAssignedTasks] = useState([]); // State for assigned tasks

  const getAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/mealDelivery/pantry/${user?._id}`);
      if (response?.data) {
        console.log("data : "  , response.data.data)
        setAssignedTasks(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllTasks();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-blue-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      {error && (
        <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      {pantryDetails ? (
        <>
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            {pantryDetails?.name}
          </h1>

          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm mb-6">
            <div>
              <p className="mb-2">
                <strong className="text-gray-700">Contact Info:</strong>{" "}
                {pantryDetails?.contactInfo}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Location:</strong>{" "}
                {pantryDetails?.location}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong className="text-gray-700">Email:</strong>{" "}
                {pantryDetails?.email}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Status:</strong>{" "}
                <span
                  className={`py-1 px-2 rounded-full text-white ${
                    pantryDetails?.status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {pantryDetails?.status}
                </span>
              </p>
            </div>
          </div>

          {/* Assigned Tasks Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Assigned Tasks
            </h2>
            {assignedTasks?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {assignedTasks?.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="mb-1">
                      <strong className="text-gray-700">Diet Chart ID:</strong>{" "}
                      {task?.dietChartId?._id}
                    </p>
                    <p>
                      <strong className="text-gray-700">Status:</strong>{" "}
                      <span
                        className={`py-1 px-2 rounded-full text-white ${
                          task?.status === "Pending"
                            ? "bg-yellow-500"
                            : task?.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      >
                        {task?.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No assigned tasks available.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          No pantry details available.
        </p>
      )}
    </div>
  );
};

export default PantryInfo;
