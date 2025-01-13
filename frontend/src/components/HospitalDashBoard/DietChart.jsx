import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";

// Restructure diet charts by time of day
const restructureDietCharts = (dietCharts) => {
  const categorized = {
    morning: [],
    evening: [],
    night: [],
  };

  dietCharts.forEach((chart) => {
    if (chart.morning) categorized.morning.push(chart.morning);
    if (chart.evening) categorized.evening.push(chart.evening);
    if (chart.night) categorized.night.push(chart.night);
  });

  return categorized;
};

const DietChart = () => {
  const [dietCharts, setDietCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch diet charts from API
  const fetchDietCharts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/dietChart/getall");
      if (response.data && response.data.data) {
        console.log("Fetched Data:", response.data.data);
        const categorizedDietCharts = restructureDietCharts(response.data.data);
        setDietCharts(categorizedDietCharts);
      } else {
        setDietCharts(null);
      }
    } catch (err) {
      console.error("Error fetching diet charts:", err);
      setError("Error fetching diet charts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDietCharts();
  }, []);

  if (loading) {
    return <div>Loading diet charts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!dietCharts) {
    return <div>No diet chart available.</div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Diet Charts</h2>
      {Object.keys(dietCharts).map((timeOfDay) => (
        <div key={timeOfDay} className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 capitalize">{timeOfDay}</h3>
          <div>
            {dietCharts[timeOfDay].map((chart, index) => (
              <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">{chart.meal}</h4>
                <p className="text-gray-600">
                  Ingredients: {Array.isArray(chart.ingredients) 
                    ? chart.ingredients.join(", ") 
                    : chart.ingredients}
                </p>
                {chart.instructions && (
                  <p className="text-gray-600">Instructions: {chart.instructions}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DietChart;
