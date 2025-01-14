import React, { useState, useEffect } from 'react';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import axiosInstance from '../../axiosConfig/axiosConfig';

const MealDeliveries = () => {
  const [mealDeliveries, setMealDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMealDeliveries = async () => {
      try {
        const response = await axiosInstance.get('/mealDelivery/all');
        if (response.data) {
          console.log(response.data.data);
          setMealDeliveries(response.data.data);
        }
        setError(false);
      } catch (err) {
        console.error('Error fetching meal deliveries:', err);
        setError(true);
      }
    };

    // Fetch data initially
    fetchMealDeliveries();

    // Set up polling
    const intervalId = setInterval(fetchMealDeliveries, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-blue-600 h-8 w-8" />
        <span className="ml-3 text-blue-600 font-semibold">Loading Meal Deliveries...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <FaExclamationTriangle className="text-red-600 h-12 w-12" />
        <span className="mt-4 text-red-600 font-semibold text-lg">Failed to fetch meal deliveries. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-7xl mx-auto mt-8">
      {/* Live Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-extrabold text-gray-900">Meal Deliveries</h2>
        <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
          <span className="animate-pulse mr-2 w-2 h-2 bg-green-500 rounded-full"></span>
          Live (Real-time updates)
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm md:text-base font-medium text-left">Patient</th>
              <th className="px-6 py-3 text-sm md:text-base font-medium text-left">Pantry</th>
              <th className="px-6 py-3 text-sm md:text-base font-medium text-left">Shift</th>
              <th className="px-6 py-3 text-sm md:text-base font-medium text-left">Delivery Person</th>
              <th className="px-6 py-3 text-sm md:text-base font-medium text-left">Status</th>
              <th className="px-6 py-3 text-sm md:text-base font-medium text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {mealDeliveries.map((delivery, index) => (
              <tr
                key={delivery._id}
                className={`border-t ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-100 transition duration-200`}
              >
                <td className="px-6 py-4 text-sm md:text-base font-medium">
                  {delivery.patientId?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm md:text-base">
                  {delivery.pantryId?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm md:text-base">
                  {delivery.shift || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm md:text-base">
                  {delivery.deliveryPersonId?.name || 'Unassigned'}
                </td>
                <td className="px-6 py-4 text-sm md:text-base">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-semibold ${
                      delivery.status === 'Prepared'
                        ? 'bg-yellow-500'
                        : delivery.status === 'Out for Delivery'
                        ? 'bg-blue-500'
                        : delivery.status === 'Delivered'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {delivery.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm md:text-base">
                  {new Date(delivery.timestamps).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealDeliveries;
