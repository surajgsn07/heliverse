import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useParams } from 'react-router-dom';

const MakeOrder = () => {
  // State to track the selected meal type, pantry, and order submission status
  const [mealType, setMealType] = useState('');
  const [pantry, setPantry] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const {patientId} = useParams()
  const [pantries, setPantries] = useState([])

  // Dummy pantry options
  // const pantries = ['Pantry 1', 'Pantry 2', 'Pantry 3'];

  const fetchPantries = async () => {
    try {
      const response = await axiosInstance.get('/pantry/getall');
      if (response.data) {
        
        setPantries(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching pantries:', error);
    }
  };

  // Handle form submission
  const handleOrderSubmit = async() => {
    if (mealType && pantry) {
      
      const response = await axiosInstance.post('/mealDelivery/' , {patientId ,shift:mealType , pantryId:pantry})
      if(response.data){
        console.log("data : " , response.data);
      }
      setOrderStatus('Order placed successfully!');
      // Reset the form fields
      setMealType('');
      setPantry('');
    } else {
      setOrderStatus('Please select both a meal and a pantry.');
    }
  };

  useEffect(() => {
    fetchPantries()
  }, [])
  

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Make an Order</h2>

      <div className="space-y-6">
        {/* Meal Type Selection */}
        <div>
          <label className="block text-lg font-medium mb-2">Select Meal Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">Select Meal</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        {/* Pantry Selection */}
        <div>
          <label className="block text-lg font-medium mb-2">Select Pantry</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={pantry}
            onChange={(e) => setPantry(e.target.value)}
          >
            <option value="">Select Pantry</option>
            {pantries.map((pantryOption, index) => (
              <option key={index} value={pantryOption._id}>
                {pantryOption.name}
              </option>
            ))}
          </select>
        </div>

        {/* Order Button */}
        <div>
          <button
            onClick={handleOrderSubmit}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Place Order
          </button>
        </div>

        {/* Order Status */}
        {orderStatus && (
          <div
            className={`text-center text-lg font-semibold mt-4 ${
              orderStatus.includes('success') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {orderStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeOrder;
