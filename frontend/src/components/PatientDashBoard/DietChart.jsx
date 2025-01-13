import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useParams } from "react-router-dom";

const DietChartManager = () => {
  const { patientId } = useParams();
  const [dietChart, setDietChart] = useState(null); // Stores the diet chart if it exists
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    morning: { meal: "", ingredients: "", instructions: "" },
    evening: { meal: "", ingredients: "", instructions: "" },
    night: { meal: "", ingredients: "", instructions: "" },
  });

  // Fetch diet chart by patient ID
  useEffect(() => {
    const fetchDietChart = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/dietChart/${patientId}`);
        if (response.data) {
          setDietChart(response.data.data);
          setFormData({
            morning: response.data.data.morning,
            evening: response.data.data.evening,
            night: response.data.data.night,
          });
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setDietChart(null); // No diet chart found
        } else {
          setError("Failed to fetch diet chart. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchDietChart();
    }
  }, [patientId]);

  // Handle form input changes
  const handleChange = (time, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [time]: {
        ...prev[time],
        [field]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dietChart) {
        // Update existing diet chart
        await axiosInstance.put(`/dietChart/${patientId}`, formData);
        alert("Diet chart updated successfully!");
      } else {
        // Add new diet chart
        await axios.post(`/api/diet-chart`, { patientId, ...formData });
        alert("Diet chart added successfully!");
      }
      window.location.reload(); // Refresh to show updated data
    } catch (err) {
      console.error(err);
      alert("Failed to save diet chart. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {dietChart ? "Update Diet Chart" : "Add Diet Chart"}
      </h2>
      <p className="mb-4 text-gray-600">
        {dietChart
          ? "A diet chart already exists for this patient. You can update it below."
          : "No diet chart found for this patient. Add a new one below."}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Morning Meal */}
        <div className="mb-6">
          <h4 className="text-lg font-medium capitalize mb-2">Morning Meal</h4>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Meal"
              value={formData["morning"].meal}
              onChange={(e) => handleChange("morning", "meal", e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Ingredients (comma-separated)"
              value={formData["morning"].ingredients}
              onChange={(e) =>
                handleChange("morning", "ingredients", e.target.value)
              }
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Instructions"
              value={formData["morning"].instructions}
              onChange={(e) =>
                handleChange("morning", "instructions", e.target.value)
              }
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Evening and Night Meals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["evening", "night"].map((time) => (
            <div key={time}>
              <h4 className="text-lg font-medium capitalize mb-2">
                {time} Meal
              </h4>
              <div className="flex flex-col space-y-3">
                <input
                  type="text"
                  placeholder="Meal"
                  value={formData[time].meal}
                  onChange={(e) =>
                    handleChange(time, "meal", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Ingredients (comma-separated)"
                  value={formData[time].ingredients}
                  onChange={(e) =>
                    handleChange(time, "ingredients", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <textarea
                  placeholder="Instructions"
                  value={formData[time].instructions}
                  onChange={(e) =>
                    handleChange(time, "instructions", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {dietChart ? "Update Diet Chart" : "Add Diet Chart"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DietChartManager;
