import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useParams } from 'react-router-dom';

const MealDeliveryHistory = () => {
  const [mealHistory, setMealHistory] = useState([]);
  const{ patientId} =  useParams()


  

  useEffect(() => {
    // Simulating fetching meal delivery data
    const fetchMealHistory = async() => {
      try {
        const response = await axiosInstance(`/mealDelivery/getDeliveriesByPatientId/${patientId}`);
        if(response.data){
          console.log("data : " , response.data);
          let arr = response.data.data;
          arr = arr.filter((item)=>item.status==="Delivered");
          setMealHistory(arr);
        }
      } catch (error) {
        console.log("error : " , error)
      }
    };

    fetchMealHistory();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Meal Delivery History</h2>

      <div className="space-y-6">
        {mealHistory.length > 0 ? (
          mealHistory.map((meal) => (
            <div key={meal.id} className="bg-white shadow-xl rounded-lg p-6 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 p-3 rounded-full">
                  {meal.status === 'Delivered' ? (
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  ) : (
                    <FaExclamationTriangle className="text-yellow-500 text-3xl" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{meal.mealName}</h3>
                  <p className="text-sm text-gray-600">{meal.deliveryDate}</p>
                </div>
              </div>
              <div>
                <span
                  className={`${
                    meal.status === 'Delivered'
                      ? 'bg-green-500 text-white px-4 py-2 rounded-full'
                      : 'bg-yellow-500 text-white px-4 py-2 rounded-full'
                  } text-sm font-semibold`}
                >
                  {meal.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No meal delivery history available.</p>
        )}
      </div>
    </div>
  );
};

export default MealDeliveryHistory;
