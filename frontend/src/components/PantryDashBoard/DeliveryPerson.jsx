import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig';

const DeliveryPersonsList = () => {
  // Sample dummy data for delivery persons
  const[deliveryPersons, setdeliveryPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  
  const fetchDeliveryPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/delivery/getall`);
      if(response.data){
        console.log("data : " , response.data.data)
        setdeliveryPersons(response.data.data);
        
      }
      setLoading(false);
    } catch (err) {
      console.log("err : " , err)
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery Persons</h1>
      
      
      {/* Card Layout for Mobile Devices */}


      {deliveryPersons.length === 0 && <p>No delivery persons found.</p>}
      {deliveryPersons.length > 0 && 
      <div className="block md:hidden">
      {deliveryPersons.map((person, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">{person.name}</h2>
          <p className="text-gray-600">Contact: {person.contactInfo}</p>
          <p className="text-gray-600">Email: {person.email}</p>
          <p className="text-gray-600">Pantry: {person.pantry}</p>
          <div className="mt-2">
            <h3 className="font-medium">Assigned Meals:</h3>
            {person.assignedMeals.map((meal, idx) => (
              <div key={idx} className="text-sm text-gray-600">
                {meal.status} (Meal ID: {meal.mealDeliveryId}, Date: {meal.timestamp})
              </div>
            ))}
          </div>
        </div>
      ))}


    </div>



      }
      
      {deliveryPersons.length > 0 && 
      <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Contact Info</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Assigned Meals</th>
          </tr>
        </thead>
        <tbody>
          {deliveryPersons.map((person, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{person.name}</td>
              <td className="py-2 px-4">{person.contactInfo}</td>
              <td className="py-2 px-4">{person.email}</td>
              <td className="py-2 px-4">
                {person.assignedMeals.map((meal, idx) => (
                  <div key={idx}>
                    {meal.status} (Meal ID: {meal.mealDeliveryId}, Date: {meal.timestamp})
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>}
      {/* Table Layout for Larger Screens */}
      
    </div>
  );
};

export default DeliveryPersonsList;
